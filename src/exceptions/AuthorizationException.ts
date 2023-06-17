/**
 * AuthorizationException
 */
export class AuthorizationException extends Error {
    
    public constructor(errorMessage: string) {
        super(errorMessage);
        this.name = "AuthorizationException";
    }
}