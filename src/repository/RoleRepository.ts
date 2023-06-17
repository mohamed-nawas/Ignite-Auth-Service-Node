import { AuthServiceException } from "../exceptions/AuthServiceException";
import { Repository } from "typeorm";
import { getRepository } from "./Repository";
import Role from "../entities/Role";
import { RoleType } from "../enums/RoleType";

/**
 * Role repository
 */
export class RoleRepository {

    private repository: Repository<Role>;

    public constructor() {
        this.repository = getRepository(Role);
    }

    /**
     * This method is used to save a Role in DB
     * 
     * @param role Role
     * @returns Role
     */
    public async save(role: Role): Promise<Role> {
        try {
            return await this.repository.save(role);
        } catch (e) {
            throw new AuthServiceException("Error occurred when saving a role to DB");
        }
    }

    /**
     * This method is used to find a role by role type
     * 
     * @param role Role type
     * @returns Role/ null
     */
    public async findByRole(role: RoleType): Promise<Role | null> {
        try {
            return await this.repository.createQueryBuilder().select("Role")
            .where("role.role=:role", {role: role})
            .getOne();
        } catch (e) {
            throw new AuthServiceException("Error occurred when finding role by rolename from DB");
        }
    }
}