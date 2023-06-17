/**
 * RoleAlreadyExistsException
 */
export class RoleAlreadyExistsException extends Error {
    
    public constructor(errorMessage: string) {
        super(errorMessage);
        this.name = "RoleAlreadyExistsException";
    }
}