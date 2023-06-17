import { ResponseStatusType } from "../enums/ResponseStatusType";

/**
 * Http response wrapper format
 */
export class ResponseWrapper {
    
    private status: ResponseStatusType;
    private message: string;
    private displayMessage: string;
    

    public constructor(status: ResponseStatusType, message: string, displayMessage: string) {
        this.status = status;
        this.message = message;
        this.displayMessage = displayMessage;
    }
}