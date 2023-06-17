import { EntityProperty } from "../../enums/EntityProperty";
import { ResponseDto } from "./ResponseDto";
import { DtoProperty } from "../../enums/DtoProperty";
import Role from "../../entities/Role";

/**
 * Response dto for a role
 */
class RoleResponseDto extends ResponseDto {
    
    private roleId: string;
    private rolename: string;
    private permissions: Array<String>; 

    public constructor(role: Role) {
        super();
        this.roleId = role.getProperty(EntityProperty.ID);
        this.rolename = role.getProperty(EntityProperty.ROLE);
        this.permissions = role.getProperty(EntityProperty.PERMISSIONS)?.map((permission: { getProperty: (arg0: EntityProperty) => any; }) => permission.getProperty(EntityProperty.PERMISSION));
    }

    public getProperty(property: DtoProperty): any {
        if (property === DtoProperty.ROLEID)
            return this.roleId;
        if (property === DtoProperty.ROLE)
            return this.rolename;
        if (property === DtoProperty.PERMISSIONS)
            return this.permissions;
        throw new Error(`No such dto property as ${property.toString()} exists in RoleResponseDto`);
    }
}

export default RoleResponseDto;