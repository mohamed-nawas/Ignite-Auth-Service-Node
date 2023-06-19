import { LoginRequestDto } from "../../src/dto/request/LoginRequestDto";
import UserJwtPayloadResponseDto from "../../src/dto/response/UserJwtPayloadResponseDto";
import Permission from "../../src/entities/Permission";
import Role from "../../src/entities/Role";
import User from "../../src/entities/User";
import { EntityProperty } from "../../src/enums/EntityProperty";
import { UserAlreadyExistsException } from "../../src/exceptions/UserAlreadyExistsException";
import { AuthRepository } from "../../src/repository/AuthRepository";
import { AuthService } from "../../src/services/AuthService";
import { sign } from "../../src/services/JwtService";
import { TOKEN_ISSUER, TOKEN_SUBJECT, TOKEN_AUDIENCE } from "../../src/utils/constants";


jest.mock('../../src/repository/AuthRepository', () => {
    return {
        AuthRepository: jest.fn(),
    }
});
jest.mock('../../src/services/JwtService', () => {
    return {
        sign: jest.fn(),
    }
})



let user = new User();
let mockedAuthRepository: jest.Mock;
let mockedJwtSign: jest.Mock;
let AuthServiceInstance: AuthService;
mockedAuthRepository = AuthRepository as unknown as jest.Mock;
mockedJwtSign = sign as jest.Mock;



describe('AuthService, createUser method test', () => {
    let mockedFindByEmail: jest.Mock;
    let mockedSave: jest.Mock;

    beforeEach(() => {
        mockedFindByEmail = jest.fn();
        mockedSave = jest.fn();
        mockedAuthRepository.mockReturnValue({
            save: mockedSave,
            findByEmail: mockedFindByEmail,
        });
        AuthServiceInstance = new AuthService();
    });

    test('Should return token, when creating user is successfull', async () => {
        mockedFindByEmail.mockResolvedValue(null);
        mockedJwtSign.mockReturnValue('eyj123')

        const result = await AuthServiceInstance.createUser(user);
        expect(result).toBe('eyj123');
        expect(mockedFindByEmail).toHaveBeenNthCalledWith<[String]>(1, user.getProperty(EntityProperty.EMAIL));
        expect(mockedSave).toHaveBeenNthCalledWith<[User]>(1, user);
        expect(mockedJwtSign).toHaveBeenNthCalledWith<[Object, Object]>(1, JSON.parse(JSON.stringify(user)), {
            issuer: TOKEN_ISSUER,
            subject: TOKEN_SUBJECT, 
            audience: TOKEN_AUDIENCE
        });
    })

    test('Should throw UserAlreadyExistsException, when creating user for user already exists', async () => {
        mockedFindByEmail.mockResolvedValue(user);

        await expect(AuthServiceInstance.createUser(user))
        .rejects.toThrow(new UserAlreadyExistsException("User already exists"));
        expect(mockedFindByEmail).toHaveBeenNthCalledWith<[String]>(1, user.getProperty(EntityProperty.EMAIL));
    })
})

describe('AuthService, login method test', () => {
    let mockedFindByEmailAndPassword: jest.Mock;
    const requestDto = new LoginRequestDto('sample@mail.com', 'sample_pwd');
    const roles = new Array<Role>();
    const role = new Role();
    roles.push(role);
    const permissions = new Array<Permission>();
    const permission = new Permission();
    permissions.push(permission);
    role.setProperty(EntityProperty.PERMISSIONS, permissions);
    user.setProperty(EntityProperty.ROLES, roles);
    const PAYLOAD = new UserJwtPayloadResponseDto(user.getProperty(EntityProperty.ID), user.getProperty(EntityProperty.FIRSTNAME),
        user.getProperty(EntityProperty.LASTNAME), user.getProperty(EntityProperty.EMAIL), [null]);

    beforeEach(() => {
        mockedFindByEmailAndPassword = jest.fn();
        mockedAuthRepository.mockReturnValue({
            findByEmailAndPassword: mockedFindByEmailAndPassword,
        })
        AuthServiceInstance = new AuthService();
    })

    test('Should return token when, when login user is successfull', async () => {
        mockedFindByEmailAndPassword.mockResolvedValue(user);
        mockedJwtSign.mockReturnValue('eyj123');

        const result = await AuthServiceInstance.login(requestDto);
        expect(result).toBe('eyj123');
        expect(mockedFindByEmailAndPassword).toHaveBeenNthCalledWith<[String, String]>(1, 'sample@mail.com', 'sample_pwd');
        expect(mockedJwtSign).toHaveBeenNthCalledWith<[Object, Object]>(1, JSON.parse(JSON.stringify(PAYLOAD)), {
            issuer: TOKEN_ISSUER,
            subject: TOKEN_SUBJECT, 
            audience: TOKEN_AUDIENCE
        });
    })
})