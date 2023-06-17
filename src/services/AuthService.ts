import User from "../entities/User";
import { EntityProperty } from "../enums/EntityProperty";
import { UserAlreadyExistsException } from "../exceptions/UserAlreadyExistsException";
import { AuthRepository } from "../repository/AuthRepository";
import { LoginRequestDto } from "../dto/request/LoginRequestDto";
import { TOKEN_ISSUER, TOKEN_SUBJECT, TOKEN_AUDIENCE } from "../utils/constants";
import { DtoProperty } from "../enums/DtoProperty";
import UserJwtPayloadResponseDto from "../dto/response/UserJwtPayloadResponseDto";
const jwtService = require('./JwtService');


/**
 * Auth service
 */
export class AuthService {

    private authRepository: AuthRepository;

    public constructor() {
        this.authRepository = new AuthRepository();
    }

    /**
     * This method is used to create a new user in DB
     * 
     * @param user User
     * @returns Jwt signed token
     */
    public async createUser(user: User): Promise<string> {
        const USER = await this.authRepository.findByEmail(user.getProperty(EntityProperty.EMAIL));
        if (USER) {
            throw new UserAlreadyExistsException("User already exists");
        }
        await this.authRepository.save(user);

        // generate the token and send
        return jwtService.sign(JSON.parse(JSON.stringify(user)), {
            issuer: TOKEN_ISSUER,
            subject: TOKEN_SUBJECT, 
            audience: TOKEN_AUDIENCE // this should be provided by client
        });    
    }

    /**
     * This method is to login a user
     * 
     * @param requestDto Login request dto
     * @returns Jwt signed token
     */
    public async login(requestDto: LoginRequestDto): Promise<string> {

        const USER = await this.authRepository.findByEmailAndPassword(requestDto.getProperty(DtoProperty.EMAIL), 
        requestDto.getProperty(DtoProperty.PASSWORD));

        const ROLES = USER.roles;
        const permissions = new Set<String>;
        let permissionsList = new Array<String>;
        ROLES.forEach(ROLE => {
            const PERMISSIONS = ROLE.permissions;
            PERMISSIONS.forEach(PERMISSION => {
                permissions.add(PERMISSION.getProperty(EntityProperty.PERMISSION));
            })
        })
        permissionsList = Array.from(permissions);

        const PAYLOAD = new UserJwtPayloadResponseDto(USER.getProperty(EntityProperty.ID), USER.getProperty(EntityProperty.FIRSTNAME),
        USER.getProperty(EntityProperty.LASTNAME), USER.getProperty(EntityProperty.EMAIL), permissionsList);

        // generate the token and send
        return jwtService.sign(JSON.parse(PAYLOAD.toJson()), {
            issuer: TOKEN_ISSUER,
            subject: TOKEN_SUBJECT,
            audience: TOKEN_AUDIENCE // this should be provided by the client
        });
    }
}