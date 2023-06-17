import "reflect-metadata";
import {DataSource} from 'typeorm';
import User from "./entities/User";
import Role from "./entities/Role";
import Permission from "./entities/Permission";

/**
 * Various data source can be configured here
 */
const MySQLDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "ignite_auth_node_db",
    entities: [User, Role, Permission],
    logging: true,
    synchronize: true,
});

// initialize mysql datasource
MySQLDataSource.initialize()
.then(() => console.log("MySQL Datasource has been successfully initialized"))
.catch((e) => console.error("Error initializing mysql datasource", e));

module.exports = MySQLDataSource;