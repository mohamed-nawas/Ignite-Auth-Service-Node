import { DtoProperty } from "../../enums/DtoProperty";
import { PermissionType } from "../../enums/PermissionType";
import { RoleType } from "../../enums/RoleType";
import { RequestDto } from "./RequestDto";

/**
 * DTO for Role creation request
 */
export class RoleCreateRequestDto extends RequestDto {

    private role: RoleType;
    private permissions: PermissionType[];

    public constructor(role: RoleType) {
        super();
        this.role = role;
    }

    public getProperty(property: DtoProperty): any {
        if (property === DtoProperty.ROLE)
            return this.role.toString();
        if (property === DtoProperty.PERMISSIONS)
            return this.permissions;
        throw new Error(`No such dto property as ${property.toString()} exists in RoleCreateRequestDto`);
    }

    public isRequiredAvailable(): boolean {
        return this.isNonEmpty(this.role.toString()) && this.permissions.length !== 0;
    }
}