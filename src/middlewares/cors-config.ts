import { Application, NextFunction, Request, Response } from "express";

/**
 * Cors Configurations
 */
module.exports = async (app: Application) => {

    app.use((req: Request, res: Response, next: NextFunction) => {
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).send();
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });
}