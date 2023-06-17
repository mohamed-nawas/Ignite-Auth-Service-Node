import { ResponseDto } from "../dto/response/ResponseDto";
import { ResponseStatusType } from "../enums/ResponseStatusType";
import { ResponseWrapper } from "./ResponseWrapper";

/**
 * Http error response wrapper format
 */
export class ErrorResponseWrapper extends ResponseWrapper {
    
    private data: ResponseDto;
    

    public constructor(status: ResponseStatusType, message: string, data: ResponseDto, displayMessage: string) {
        super(status, message, displayMessage);
        this.data = data;
    }
}