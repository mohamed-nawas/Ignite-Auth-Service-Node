import { ResponseDto } from "./ResponseDto";

/**
 * Response dto for a token
 */
class TokenResponseDto extends ResponseDto {
    
    private email: string;
    private token: string;

    public constructor(email: string, token: string) {
        super();
        this.email = email;
        this.token = token;
    }
}

export default TokenResponseDto;