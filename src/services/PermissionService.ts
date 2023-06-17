import { EntityProperty } from "../enums/EntityProperty";
import { PermissionAlreadyExistsException } from "../exceptions/PermissionAlreadyExistsException";
import { PermissionRepository } from "../repository/PermissionRepository";
import Permission from "../entities/Permission";
import { PermissionNotFoundException } from "../exceptions/PermissionNotFoundException";


/**
 * Permission service
 */
export class PermissionService {

    private permissionRepository: PermissionRepository;

    public constructor() {
        this.permissionRepository = new PermissionRepository();
    }

    /**
     * This method is used to create a new permission in DB
     * 
     * @param permission Permission
     */
    public async createPermission(permission: Permission): Promise<void> {
        const PERMISSION = await this.permissionRepository.findByPermission(permission.getProperty(EntityProperty.PERMISSION));
        if (PERMISSION) {
            throw new PermissionAlreadyExistsException("Permission already exists");
        }
        await this.permissionRepository.save(permission);
    }

    /**
     * This method is used to find a permission by name in DB
     * 
     * @param permission Permission name
     * @returns Permission
     */
    public async findByPermission(permission: string): Promise<Permission> {
        const PERMISSION = await this.permissionRepository.findByPermission(permission);
        if (!PERMISSION) {
            throw new PermissionNotFoundException("Permission not found for the given permission name: " + permission);
        }
        return PERMISSION;
    }
}