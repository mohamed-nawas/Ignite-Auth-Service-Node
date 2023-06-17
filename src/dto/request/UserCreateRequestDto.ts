import { DtoProperty } from "../../enums/DtoProperty";
import { RoleType } from "../../enums/RoleType";
import { RequestDto } from "./RequestDto";

/**
 * DTO for User creation request
 */
export class UserCreateRequestDto extends RequestDto {

    private firstname: string;
    private lastname: string;
    private email: string;
    private password: string;
    private roles: RoleType[];

    public constructor(firstname: string, lastname: string, email: string, password: string) {
        super();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    public getProperty(property: DtoProperty): any {
        if (property === DtoProperty.FIRSTNAME)
            return this.firstname;
        if (property === DtoProperty.LASTNAME)
            return this.lastname;
        if (property === DtoProperty.EMAIL)
            return this.email;
        if (property === DtoProperty.PASSWORD)
            return this.password;
        if (property === DtoProperty.ROLES)
            return this.roles;
        throw new Error(`No such dto property as ${property.toString()} exists in UserCreateRequestDto`);
    }

    public isRequiredAvailable(): boolean {
        return this.isNonEmpty(this.firstname) && this.isNonEmpty(this.lastname) && 
        this.isNonEmpty(this.email) && this.isNonEmpty(this.password) &&
        this.roles.length !== 0;
    }
}