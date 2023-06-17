import { ResponseStatusTypeProperty } from "./ResponseStatusTypeProperty";

/**
 * Success response status type
 */
export class SuccessResponseStatusType {

    static CREATE_USER = new SuccessResponseStatusType(201, "Successfully created the user");
    static CREATE_ROLE = new SuccessResponseStatusType(201, "Successfully created the role");
    static CREATE_PERMISSION = new SuccessResponseStatusType(201, "Successfully created the permission");
    static ADDED_ROLE_PERMISSIONS = new SuccessResponseStatusType(200, "Successfully added permissions to the role");
    static GET_USER = new SuccessResponseStatusType(200, "Successfully returned the user");
    static GET_PERMISSION = new SuccessResponseStatusType(200, "Successfully returned the permission");

    static LOGIN_USER = new SuccessResponseStatusType(200, "Successfully logged in the user");

    private code: number;
    private message: string;

    public constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    public getProperty(property: ResponseStatusTypeProperty): any {
        if (property === ResponseStatusTypeProperty.CODE) {
            return this.code;
        }
        return this.message;
    }
}