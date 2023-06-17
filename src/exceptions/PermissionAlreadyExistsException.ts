/**
 * PermissionAlreadyExistsException
 */
export class PermissionAlreadyExistsException extends Error {
    
    public constructor(errorMessage: string) {
        super(errorMessage);
        this.name = "PermissionAlreadyExistsException";
    }
}