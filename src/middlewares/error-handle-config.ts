import { Application, NextFunction, Request, Response } from "express";
import { Logger } from "tslog";
import { ErrorResponseStatusType } from "../enums/ErrorResponseStatusType";
import { ResponseStatusTypeProperty } from "../enums/ResponseStatusTypeProperty";
import { getErrorResponseWrapper } from "../controllers/Controller";

/**
 * Error handler middleware
 */
module.exports = async (app: Application) => {

    const logger = new Logger();

    const AUTH_SERVICE_EXCEPTION = "AuthServiceException";
    const PERMISSION_ALREADY_EXISTS_EXCEPTION = "PermissionAlreadyExistsException";
    const PERMISSION_NOT_FOUND_EXCEPTION = "PermissionNotFoundException";
    const ROLE_ALREADY_EXISTS_EXCEPTION = "RoleAlreadyExistsException";
    const ROLE_NOT_FOUND_EXCEPTION = "RoleNotFoundException";
    const USER_ALREADY_EXISTS_EXCEPTION = "UserAlreadyExistsException";
    const USER_NOT_FOUND_EXCEPTION = "UserNotFoundException";
    const AUTHORIZATION_EXCEPTION = "AuthorizationException";

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err.name === AUTH_SERVICE_EXCEPTION) {
            logger.error("Error occured, exception: " + AUTH_SERVICE_EXCEPTION);
            res.status(ErrorResponseStatusType.INTERNAL_SERVER_ERROR.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.INTERNAL_SERVER_ERROR));
        }
        if (err.name === PERMISSION_ALREADY_EXISTS_EXCEPTION) {
            logger.error("Error occured, exception: " + PERMISSION_ALREADY_EXISTS_EXCEPTION);
            res.status(ErrorResponseStatusType.PERMISSION_ALREADY_EXISTS.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.PERMISSION_ALREADY_EXISTS));
        }
        if (err.name === PERMISSION_NOT_FOUND_EXCEPTION) {
            logger.error("Error occured, exception: " + PERMISSION_NOT_FOUND_EXCEPTION);
            res.status(ErrorResponseStatusType.PERMISSION_NOT_FOUND.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.PERMISSION_NOT_FOUND));
        }
        if (err.name === ROLE_ALREADY_EXISTS_EXCEPTION) {
            logger.error("Error occured, exception: " + ROLE_ALREADY_EXISTS_EXCEPTION);
            res.status(ErrorResponseStatusType.ROLE_ALREADY_EXISTS.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.ROLE_ALREADY_EXISTS));
        }
        if (err.name === ROLE_NOT_FOUND_EXCEPTION) {
            logger.error("Error occured, exception: " + ROLE_NOT_FOUND_EXCEPTION);
            res.status(ErrorResponseStatusType.ROLE_NOT_FOUND.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.ROLE_NOT_FOUND));
        }
        if (err.name === USER_ALREADY_EXISTS_EXCEPTION) {
            logger.error("Error occured, exception: " + USER_ALREADY_EXISTS_EXCEPTION);
            res.status(ErrorResponseStatusType.USER_ALREADY_EXISTS.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.USER_ALREADY_EXISTS));
        }
        if (err.name === USER_NOT_FOUND_EXCEPTION) {
            logger.error("Error occured, exception: " + USER_NOT_FOUND_EXCEPTION);
            res.status(ErrorResponseStatusType.USER_NOT_FOUND.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.USER_NOT_FOUND));
        }
        if (err.name === AUTHORIZATION_EXCEPTION) {
            logger.error("Error occured, exception: " + AUTHORIZATION_EXCEPTION);
            res.status(ErrorResponseStatusType.UNAUTHORIZED.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.UNAUTHORIZED, err));
        }
    });
}