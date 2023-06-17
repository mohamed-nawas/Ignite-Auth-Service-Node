import express, { Application } from "express";
import AuthRouter from "./routers/AuthRouter";
import RoleRouter from "./routers/RoleRouter";
import PermissionRouter from "./routers/PermissionRouter";
import { AUTH_BASE_URL, PERMISSION_BASE_URL, ROLE_BASE_URL } from "./utils/constants";
const corsConfig = require('./middlewares/cors-config');
const authConfig = require('./middlewares/auth-config');
const errorHandler = require('./middlewares/error-handle-config');

/**
 * Express app
 */
module.exports = async (app: Application) => {
    
    // configuring necessary properties for server
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // cors
    await corsConfig(app);
    

    // auth configurations
    await authConfig(app);

    // routes definition
    app.use(AUTH_BASE_URL, AuthRouter);
    app.use(ROLE_BASE_URL, RoleRouter);
    app.use(PERMISSION_BASE_URL, PermissionRouter);

    // error handling
    await errorHandler(app);
}