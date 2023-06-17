/**
 * RoleNotFoundException
 */
export class RoleNotFoundException extends Error {
    
    public constructor(errorMessage: string) {
        super(errorMessage);
        this.name = "RoleNotFoundException";
    }
}