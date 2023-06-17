import { ResponseStatusTypeProperty } from "./ResponseStatusTypeProperty";

/**
 * Error response status type
 */
export class ErrorResponseStatusType {

    static MISSING_REQUIRED_FIELDS = new ErrorResponseStatusType(400, "Missing required fields");
    static USER_ALREADY_EXISTS = new ErrorResponseStatusType(400, "User already exists for given data");
    static ROLE_ALREADY_EXISTS = new ErrorResponseStatusType(400, "Role already exists for given details");
    static PERMISSION_ALREADY_EXISTS = new ErrorResponseStatusType(400, "Permission already exists for given details");
    static UNAUTHORIZED = new ErrorResponseStatusType(401, "Unauthorized");
    static FORBIDDEN = new ErrorResponseStatusType(403, "Forbidden");
    static USER_NOT_FOUND = new ErrorResponseStatusType(404, "User not found");
    static ROLE_NOT_FOUND = new ErrorResponseStatusType(404, "Role not found");
    static PERMISSION_NOT_FOUND = new ErrorResponseStatusType(404, "Permission not found");
    static INTERNAL_SERVER_ERROR = new ErrorResponseStatusType(500, "Internal server error");

    private code: number;
    private message: string;

    private constructor(code: number, message: string) {
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