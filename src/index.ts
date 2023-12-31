import "reflect-metadata";
import express, { Application } from "express";
import { PORT } from "./utils/constants";
const expressApp = require('./express-app');
// const dbSeeder = require('./db-seeder');

const StartServer = async() => {

    // initialize the application server
    const app: Application = express();
    
    await expressApp(app);
    // commandline runner
    // await dbSeeder();

    // listen to the application server on PORT
    app.listen(PORT, (): void => {
        console.log(`Express application server running on address=> http://localhost:${PORT}`);
    });
}

StartServer();