import { DtoProperty } from "../../enums/DtoProperty";
import { RequestDto } from "./RequestDto";

/**
 * DTO for login request
 */
export class LoginRequestDto extends RequestDto {

    private email: string;
    private password: string;

    public constructor(email: string, password: string) {
        super();
        this.email = email;
        this.password = password;
    }

    public getProperty(property: DtoProperty): any {
        if (property === DtoProperty.EMAIL)
            return this.email;
        if (property === DtoProperty.PASSWORD)
            return this.password;
        throw new Error(`No such dto property as ${property.toString()} exists in LoginRequestDto`);
    }

    public isRequiredAvailable(): boolean {
        return this.isNonEmpty(this.email) && this.isNonEmpty(this.password);
    }
}