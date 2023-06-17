import { DtoProperty } from "../../enums/DtoProperty";
import { PermissionType } from "../../enums/PermissionType";
import { RequestDto } from "./RequestDto";

/**
 * DTO for adding permissions to role request
 */
export class AddRolePermissionsRequestDto extends RequestDto {

    private permissions: Set<PermissionType>;

    public constructor(permissions: Set<PermissionType>) {
        super();
        this.permissions = permissions;
    }

    public getProperty(property: DtoProperty): Set<PermissionType> {
        if (property === DtoProperty.PERMISSIONS)
            return this.permissions;
        throw new Error(`No such dto property as ${property.toString()} exists in UserCreateRequestDto`);
    }

    public isRequiredAvailable(): boolean {
        return this.permissions.size !== 0;
    }
}