import User from "../entities/User";
import { AuthServiceException } from "../exceptions/AuthServiceException";
import { Repository } from "typeorm";
import { getRepository } from "./Repository";
import bcrypt from 'bcrypt';
import { EntityProperty } from "../enums/EntityProperty";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { AuthorizationException } from "../exceptions/AuthorizationException";

/**
 * Auth repository
 */
export class AuthRepository {

    private static pwdHashSaltRound: number = 8;
    private repository: Repository<User>;

    public constructor() {
        this.repository = getRepository(User);
    }

    /**
     * This method is used to save a user in User DB
     * 
     * @param user User
     */
    public async save(user: User): Promise<void> {
        const hashedUserPwd = await bcrypt.hash(user.getProperty(EntityProperty.PASSWORD), AuthRepository.pwdHashSaltRound);
        user.setPassword(hashedUserPwd);
        try {
            await this.repository.save(user);
        } catch (e) {
            throw new AuthServiceException("Error occurred when saving a user to DB");
        }
    }

    /**
     * This method is used to find a user by email
     * 
     * @param email User email
     * @returns User/ null
     */
    public async findByEmail(email: string): Promise<User | null> {
        try {
            return await this.repository.createQueryBuilder().select("User")
            .where("user.email=:email", {email: email})
            .getOne();
        } catch (e) {
            throw new AuthServiceException("Error occurred when finding user by email from DB");
        }
    }

    /**
     * This method is used to find a user by email and password
     * 
     * @param email User email
     * @param password User password
     * @returns User
     */
    public async findByEmailAndPassword(email: string, password: string): Promise<User> {
        let USER = null;

        try {
            USER = await this.repository.createQueryBuilder().select("User")
            .leftJoinAndSelect("User.roles", "roles")
            .leftJoinAndSelect("roles.permissions", "permissions")
            .where("user.email=:email", {email: email})
            .getOne();
        } catch (e) {
            throw new AuthServiceException("Error occurred when finding user by email and password from DB");
        }

        if (!USER) {
            throw new UserNotFoundException("User not found in DB for given email");
        }
        if (!await bcrypt.compare(password, USER.getProperty(EntityProperty.PASSWORD)))
            throw new AuthorizationException("Email and password don't match for authorization request");

        return USER;
    }
}