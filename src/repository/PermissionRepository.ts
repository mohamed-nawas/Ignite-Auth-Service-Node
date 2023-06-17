import { AuthServiceException } from "../exceptions/AuthServiceException";
import { Repository } from "typeorm";
import { getRepository } from "./Repository";
import Permission from "../entities/Permission";

/**
 * Permission repository
 */
export class PermissionRepository {

    private repository: Repository<Permission>;

    public constructor() {
        this.repository = getRepository(Permission);
    }

    /**
     * This method is used to save a permission in DB
     * 
     * @param permission Permission
     */
    public async save(permission: Permission): Promise<void> {
        try {
            await this.repository.save(permission);
        } catch (e) {
            throw new AuthServiceException("Error occurred when saving a permission to DB");
        }
    }

    /**
     * This method is used to find a permission by name
     * 
     * @param permission Permission name
     * @returns Permission/ null
     */
    public async findByPermission(permission: string): Promise<Permission | null> {
        try {
            return await this.repository.createQueryBuilder().select("Permission")
            .where("permission.permission=:permission", {permission: permission})
            .getOne();
        } catch (e) {
            throw new AuthServiceException("Error occurred when finding Permission by permission from DB");
        }
    }
}