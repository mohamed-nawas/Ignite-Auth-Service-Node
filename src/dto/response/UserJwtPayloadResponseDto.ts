import { ResponseDto } from "./ResponseDto";
import { DtoProperty } from "../../enums/DtoProperty";

/**
 * Response dto for a user jwt payload
 */
class UserJwtPayloadResponseDto extends ResponseDto {
    
    private userId: string;
    private firstname: string;
    private lastname: string;
    private email: string;
    private permissions: Array<String>;

    public constructor(userId: string, firstname: string, lastname: string, email: string, permissions: Array<String>) {
        super();
        this.userId = userId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.permissions = permissions;
    }

    public getProperty(property: DtoProperty): any {
        if (property === DtoProperty.USERID)
            return this.userId;
        if (property === DtoProperty.FIRSTNAME)
            return this.firstname;
        if (property === DtoProperty.LASTNAME)
            return this.lastname;
        if (property === DtoProperty.EMAIL)
            return this.email;
        if (property === DtoProperty.PERMISSIONS)
            return this.permissions;
        throw new Error(`No such dto property as ${property.toString()} exists in UserResponseDto`);
    }
}

export default UserJwtPayloadResponseDto;