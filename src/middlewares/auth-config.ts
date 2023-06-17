import { Application, NextFunction, Request, Response } from "express";
import { Logger } from "tslog";
import { getErrorResponseWrapper } from "../controllers/Controller";
import { ErrorResponseStatusType } from "../enums/ErrorResponseStatusType";
import { ResponseStatusTypeProperty } from "../enums/ResponseStatusTypeProperty";
const jwtService = require('../services/JwtService');

/**
 * Authorization Configurations
 */
module.exports = async (app: Application) => {

    const AUTHORIZATION_HEADER = "Authorization";
    const logger = new Logger();

    // intercept the requests and do the Authorizationa & PBAC
    app.use((req: Request, res: Response, next: NextFunction) => {

        // whitelist login endpoint
        if (req.method === 'POST' && req.originalUrl === "/api/v1/auth/login")
            return next();

        // do the authorization for all other endpoints
        if (!req.header(AUTHORIZATION_HEADER)) {
            logger.error("Authorization header is not present on the requested resource");
            res.status(ErrorResponseStatusType.UNAUTHORIZED.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.UNAUTHORIZED));
        } else {

            // add PBAC to register endpoint
            if (req.method === 'POST' && req.originalUrl === "/api/v1/auth/register") {
                const token = req.header(AUTHORIZATION_HEADER).substring(7);
                const decoded = jwtService.verify(token, {
                issuer: "Computic Solutions",
                subject: "Auth token", 
                audience: "Client_Identity" // this should be provided by client
                });

                if (!decoded.permissions.includes("CREATE_USER")) {
                    logger.error("OOps!, you don't have priveleges to access this resource");
                    res.status(ErrorResponseStatusType.FORBIDDEN.getProperty(ResponseStatusTypeProperty.CODE))
                    .send(getErrorResponseWrapper(ErrorResponseStatusType.FORBIDDEN));
                } else {
                    next();
                }
            }
        }
    });
}