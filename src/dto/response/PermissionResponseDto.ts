import { EntityProperty } from "../../enums/EntityProperty";
import { ResponseDto } from "./ResponseDto";
import { DtoProperty } from "../../enums/DtoProperty";
import Permission from "../../entities/Permission";

/**
 * Response dto for a permission
 */
class PermissionResponseDto extends ResponseDto {
    
    private permissionId: string;
    private permission: string;

    public constructor(permission: Permission) {
        super();
        this.permissionId = permission.getProperty(EntityProperty.ID);
        this.permission = permission.getProperty(EntityProperty.PERMISSION);
    }

    public getProperty(property: DtoProperty): string {
        if (property === DtoProperty.PERMISSIONID)
            return this.permissionId;
        if (property === DtoProperty.PERMISSION)
            return this.permission;
        throw new Error(`No such dto property as ${property.toString()} exists in PermissionResponseDto`);
    }
}

export default PermissionResponseDto;