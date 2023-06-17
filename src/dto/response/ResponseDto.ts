import { BaseDto } from "../BaseDto";

/**
 * Response dto, all response classes should implement this
 */
export class ResponseDto implements BaseDto {

    toJson(): string {
        return JSON.stringify(this);
    }

}