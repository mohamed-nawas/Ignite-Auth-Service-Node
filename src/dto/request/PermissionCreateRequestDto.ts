import { DtoProperty } from "../../enums/DtoProperty";
import { PermissionType } from "../../enums/PermissionType";
import { RequestDto } from "./RequestDto";

/**
 * DTO for Permission creation request
 */
export class PermissionCreateRequestDto extends RequestDto {

    private permission: PermissionType;

    public constructor(permission: PermissionType) {
        super();
        this.permission = permission;
    }

    public getProperty(property: DtoProperty): string {
        if (property === DtoProperty.PERMISSION)
            return this.permission.toString();
        throw new Error(`No such dto property as ${property.toString()} exists in PermissionCreateRequestDto`);
    }

    public isRequiredAvailable(): boolean {
        return this.isNonEmpty(this.permission.toString());
    }
}