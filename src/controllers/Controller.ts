/**
 * Base controller
 */

import { ResponseDto } from "../dto/response/ResponseDto";
import { ErrorResponseStatusType } from "../enums/ErrorResponseStatusType";
import { ResponseStatusType } from "../enums/ResponseStatusType";
import { ResponseStatusTypeProperty } from "../enums/ResponseStatusTypeProperty";
import { SuccessResponseStatusType } from "../enums/SuccessResponseStatusType";
import { ErrorResponseWrapper } from "../wrapper/ErrorResponseWrapper";
import { ResponseWrapper } from "../wrapper/ResponseWrapper";
import { SuccessResponseWrapper } from "../wrapper/SuccessResponseWrapper";

const SUCCESS_MESSAGE = "Successfully returned the data.";
const ERROR_MESSAGE = "Oops!! Something went wrong. Please try again.";

export function getErrorResponseWrapper(status: ErrorResponseStatusType, error?: Error): ResponseWrapper {
        if (error) {
                return new ErrorResponseWrapper(ResponseStatusType.ERROR, error.message, null, 
                ERROR_MESSAGE);  
        }
        return new ErrorResponseWrapper(ResponseStatusType.ERROR, status.getProperty(ResponseStatusTypeProperty.MESSAGE), null, 
        ERROR_MESSAGE);
}

export function getSuccessResponseWrapper(status: SuccessResponseStatusType, data: ResponseDto): ResponseWrapper {
        return new SuccessResponseWrapper(ResponseStatusType.SUCCESS, status.getProperty(ResponseStatusTypeProperty.MESSAGE), data, 
        SUCCESS_MESSAGE);
}