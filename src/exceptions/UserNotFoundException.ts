/**
 * UserNotFoundException
 */
export class UserNotFoundException extends Error {
    
    public constructor(errorMessage: string) {
        super(errorMessage);
        this.name = "UserNotFoundException";
    }
}