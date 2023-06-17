import { EntityProperty } from "../../enums/EntityProperty";
import User from "../../entities/User";
import { ResponseDto } from "./ResponseDto";
import { DtoProperty } from "../../enums/DtoProperty";

/**
 * Response dto for a user
 */
class UserResponseDto extends ResponseDto {
    
    private userId: string;
    private firstname: string;
    private lastname: string;
    private email: string;
    private roles: Array<String>;

    public constructor(user: User) {
        super();
        this.userId = user.getProperty(EntityProperty.ID);
        this.firstname = user.getProperty(EntityProperty.FIRSTNAME);
        this.lastname = user.getProperty(EntityProperty.LASTNAME);
        this.email = user.getProperty(EntityProperty.EMAIL);
        this.roles = user.getProperty(EntityProperty.ROLES)?.map((role: { getProperty: (arg0: EntityProperty) => any; }) => role.getProperty(EntityProperty.ROLE))
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
        if (property === DtoProperty.ROLES)
            return this.roles;
        throw new Error(`No such dto property as ${property.toString()} exists in UserResponseDto`);
    }
}

export default UserResponseDto;