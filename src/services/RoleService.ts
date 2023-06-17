import { EntityProperty } from "../enums/EntityProperty";
import { RoleAlreadyExistsException } from "../exceptions/RoleAlreadyExistsException";
import { RoleRepository } from "../repository/RoleRepository";
import Role from "../entities/Role";
import { RoleNotFoundException } from "../exceptions/RoleNotFoundException";
import { RoleType } from "../enums/RoleType";


/**
 * Role service
 */
export class RoleService {

    private roleRepository: RoleRepository;

    public constructor() {
        this.roleRepository = new RoleRepository();
    }

    /**
     * This method is used to create a new role in DB
     * 
     * @param role Role
     */
    public async createRole(role: Role): Promise<void> {
        const ROLE = await this.roleRepository.findByRole(role.getProperty(EntityProperty.ROLE));
        if (ROLE) {
            throw new RoleAlreadyExistsException("Role already exists");
        }
        await this.roleRepository.save(role);
    }

    /**
     * This method is used to find a role by role name
     * 
     * @param roleType Role type
     * @returns Role
     */
    public async findByRole(roleType: RoleType): Promise<Role> {
        const ROLE = await this.roleRepository.findByRole(roleType);
        if (!ROLE) {
            throw new RoleNotFoundException("Role not found for the given role type: " + roleType.toString());
        }
        return ROLE;
    }
}