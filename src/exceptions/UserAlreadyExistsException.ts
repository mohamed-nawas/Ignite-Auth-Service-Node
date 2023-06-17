/**
 * UserAlreadyExistsException
 */
export class UserAlreadyExistsException extends Error {
    
    public constructor(errorMessage: string) {
        super(errorMessage);
        this.name = "UserAlreadyExistsException";
    }
}