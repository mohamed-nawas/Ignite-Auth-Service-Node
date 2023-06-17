/**
 * PermissionNotFoundException
 */
export class PermissionNotFoundException extends Error {
    
    public constructor(errorMessage: string) {
        super(errorMessage);
        this.name = "PermissionNotFoundException";
    }
}