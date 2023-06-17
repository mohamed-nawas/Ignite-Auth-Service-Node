/**
 * This is the base exception for auth microservice
 */
export class AuthServiceException extends Error {
    
    public constructor(errorMessage: string) {
        super(errorMessage);
        this.name = "AuthServiceException";
    }
}