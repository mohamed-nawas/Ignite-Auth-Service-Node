import { BaseDto } from "../BaseDto";

/**
 * Request dto, all request classes should implement this
 */
export abstract class RequestDto implements BaseDto {

    /**
     * This method checks if all required properties of this DTO is present
     */
    protected abstract isRequiredAvailable(): boolean;

    /**
     * This method checks whether the given string field is empty, null or undefined
     * 
     * @param field field to check
     * @returns true/false
     */
    protected isNonEmpty(field: string): boolean {
        return field !== undefined && field !== null && field.trim().length !== 0;
    }

    toJson(): string {
        return JSON.stringify(this);
    }

}