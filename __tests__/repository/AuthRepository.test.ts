import { getRepository } from "../../src/repository/Repository";
import { AuthRepository } from "../../src/repository/AuthRepository";
import User from "../../src/entities/User";
import {hash, compare} from 'bcrypt';
import { AuthServiceException } from "../../src/exceptions/AuthServiceException";
import { UserNotFoundException } from "../../src/exceptions/UserNotFoundException";
import { AuthorizationException } from "../../src/exceptions/AuthorizationException";



jest.mock('../../src/repository/Repository', () => {
    return {
        getRepository: jest.fn(),
    }
});
jest.mock('bcrypt', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}))



const user = new User();
user.setPassword('user_pwd')
let mockedGetRepository: jest.Mock;
let mockedHash: jest.Mock;
let mockedCompare: jest.Mock;
let AuthRepositoryInstance: AuthRepository;
mockedGetRepository = getRepository as jest.Mock;
mockedHash = hash as jest.Mock;
mockedCompare = compare as jest.Mock;


let createQueryBuilderSpy: jest.Mock;
let selectSpy: jest.Mock;
let whereSpy: jest.Mock;



describe('AuthRepository, save method test', () => {
    let mockedSave: jest.Mock;

    beforeEach(() => {
        mockedSave = jest.fn();
        mockedGetRepository.mockReturnValue({
            save: mockedSave,
        });
        AuthRepositoryInstance = new AuthRepository();
    });

    test('Should save user, when saving user is successful', async () => {
        mockedHash.mockResolvedValue('hashed_pwd');
        mockedSave.mockResolvedValue(user);

        await AuthRepositoryInstance.save(user);
        expect(mockedHash).toHaveBeenNthCalledWith<[String, Number]>(1, 'user_pwd', 8);
        expect(mockedSave).toHaveBeenNthCalledWith<[User]>(1, user);
    });

    test('Should throw AuthServiceException, when saving user is failed', async () => {
        mockedHash.mockResolvedValue('hashed_pwd');
        mockedSave.mockRejectedValue('');

        await expect(AuthRepositoryInstance.save(user))
        .rejects.toThrow(new AuthServiceException("Error occurred when saving a user to DB"));
        // expect(mockedHash).toHaveBeenNthCalledWith<[String, Number]>(1, 'user_pwd', 8);
        expect(mockedSave).toHaveBeenNthCalledWith<[User]>(1, user);
    })
})

describe('AuthRepository, findByEmail method test', () => {
    let findByEmailSpy: jest.Mock;

    beforeEach(() => {
        createQueryBuilderSpy = jest.fn().mockReturnThis();
        selectSpy = jest.fn().mockReturnThis();
        whereSpy = jest.fn().mockReturnThis();
        findByEmailSpy = jest.fn();
        mockedGetRepository.mockReturnValue({
            createQueryBuilder: createQueryBuilderSpy,
            select: selectSpy,
            where: whereSpy,
            getOne: findByEmailSpy,
        });
        AuthRepositoryInstance = new AuthRepository();
    });

    test('Should find user by email, when finding by email is successful', async () => {
        findByEmailSpy.mockResolvedValue(user);

        const result = await AuthRepositoryInstance.findByEmail('sample_mail');
        expect(result).toBe(user);
        expect(createQueryBuilderSpy).toHaveBeenNthCalledWith<[]>(1);
        expect(selectSpy).toHaveBeenNthCalledWith<[String]>(1, "User");
        expect(whereSpy).toHaveBeenNthCalledWith<[String, Object]>(1, "user.email=:email", {email: 'sample_mail'});
        expect(findByEmailSpy).toHaveBeenNthCalledWith<[]>(1);
    });

    test('Should throw AuthServiceException, when finding by email is failed', async () => {
        findByEmailSpy.mockRejectedValue('');

        await expect(AuthRepositoryInstance.findByEmail('sample_mail'))
        .rejects.toThrow(new AuthServiceException("Error occurred when finding user by email from DB"));
        expect(createQueryBuilderSpy).toHaveBeenNthCalledWith<[]>(1);
        expect(selectSpy).toHaveBeenNthCalledWith<[String]>(1, "User");
        expect(whereSpy).toHaveBeenNthCalledWith<[String, Object]>(1, "user.email=:email", {email: 'sample_mail'});
        expect(findByEmailSpy).toHaveBeenNthCalledWith<[]>(1);
    })
})

describe('AuthRepository, findByEmailAndPassword method test', () => {
    let leftJoinAndSelectSpy: jest.Mock;
    let findByEmailAndPasswordSpy: jest.Mock;

    beforeEach(() => {
        createQueryBuilderSpy = jest.fn().mockReturnThis();
        selectSpy = jest.fn().mockReturnThis();
        leftJoinAndSelectSpy = jest.fn().mockReturnThis(),
        whereSpy = jest.fn().mockReturnThis();
        findByEmailAndPasswordSpy = jest.fn();
        mockedGetRepository.mockReturnValue({
            createQueryBuilder: createQueryBuilderSpy,
            select: selectSpy,
            leftJoinAndSelect: leftJoinAndSelectSpy,
            where: whereSpy,
            getOne: findByEmailAndPasswordSpy,
        });
        AuthRepositoryInstance = new AuthRepository();
    });

    test('Should find user by email and password, when finding by email and password is successful', async () => {
        findByEmailAndPasswordSpy.mockResolvedValue(user);
        mockedCompare.mockResolvedValue(true);

        const result = await AuthRepositoryInstance.findByEmailAndPassword('sample_mail', 'sample_pwd');
        expect(result).toBe(user);
        expect(createQueryBuilderSpy).toHaveBeenNthCalledWith<[]>(1);
        expect(selectSpy).toHaveBeenNthCalledWith<[String]>(1, "User");
        expect(leftJoinAndSelectSpy).toHaveBeenNthCalledWith<[String, String]>(1, "User.roles", "roles");
        expect(leftJoinAndSelectSpy).toHaveBeenNthCalledWith<[String, String]>(2, "roles.permissions", "permissions");
        expect(whereSpy).toHaveBeenNthCalledWith<[String, Object]>(1, "user.email=:email", {email: 'sample_mail'});
        expect(findByEmailAndPasswordSpy).toHaveBeenNthCalledWith<[]>(1);
        // expect(mockedCompare).toHaveBeenNthCalledWith<[String, String]>(1, 'sample_pwd', 'user_pwd')
    });

    test('Should throw AuthServiceException, when finding by email and password is failed', async () => {
        findByEmailAndPasswordSpy.mockRejectedValue('');

        await expect(AuthRepositoryInstance.findByEmailAndPassword('sample_mail', 'sample_pwd'))
        .rejects.toThrow(new AuthServiceException("Error occurred when finding user by email and password from DB"));
        expect(createQueryBuilderSpy).toHaveBeenNthCalledWith<[]>(1);
        expect(selectSpy).toHaveBeenNthCalledWith<[String]>(1, "User");
        expect(leftJoinAndSelectSpy).toHaveBeenNthCalledWith<[String, String]>(1, "User.roles", "roles");
        expect(leftJoinAndSelectSpy).toHaveBeenNthCalledWith<[String, String]>(2, "roles.permissions", "permissions");
        expect(whereSpy).toHaveBeenNthCalledWith<[String, Object]>(1, "user.email=:email", {email: 'sample_mail'});
        expect(findByEmailAndPasswordSpy).toHaveBeenNthCalledWith<[]>(1);
    });

    test('Should throw UserNotFoundException, when finding by email and password for user not found', async () => {
        findByEmailAndPasswordSpy.mockResolvedValue(null);

        await expect(AuthRepositoryInstance.findByEmailAndPassword('sample_mail', 'sample_pwd'))
        .rejects.toThrow(new UserNotFoundException("User not found in DB for given email"));
        expect(createQueryBuilderSpy).toHaveBeenNthCalledWith<[]>(1);
        expect(selectSpy).toHaveBeenNthCalledWith<[String]>(1, "User");
        expect(leftJoinAndSelectSpy).toHaveBeenNthCalledWith<[String, String]>(1, "User.roles", "roles");
        expect(leftJoinAndSelectSpy).toHaveBeenNthCalledWith<[String, String]>(2, "roles.permissions", "permissions");
        expect(whereSpy).toHaveBeenNthCalledWith<[String, Object]>(1, "user.email=:email", {email: 'sample_mail'});
        expect(findByEmailAndPasswordSpy).toHaveBeenNthCalledWith<[]>(1);
    });

    test('Should throw AuthorizationException, when finding by email and password for email and password dont match', async () => {
        findByEmailAndPasswordSpy.mockResolvedValue(user);
        mockedCompare.mockResolvedValue(false);

        await expect(AuthRepositoryInstance.findByEmailAndPassword('sample_mail', 'sample_pwd'))
        .rejects.toThrow(new AuthorizationException("Email and password don't match for authorization request"));
        expect(createQueryBuilderSpy).toHaveBeenNthCalledWith<[]>(1);
        expect(selectSpy).toHaveBeenNthCalledWith<[String]>(1, "User");
        expect(leftJoinAndSelectSpy).toHaveBeenNthCalledWith<[String, String]>(1, "User.roles", "roles");
        expect(leftJoinAndSelectSpy).toHaveBeenNthCalledWith<[String, String]>(2, "roles.permissions", "permissions");
        expect(whereSpy).toHaveBeenNthCalledWith<[String, Object]>(1, "user.email=:email", {email: 'sample_mail'});
        expect(findByEmailAndPasswordSpy).toHaveBeenNthCalledWith<[]>(1);
        // expect(mockedCompare).toHaveBeenNthCalledWith<[String, String]>(1, 'sample_pwd', 'user_pwd');
    });
})