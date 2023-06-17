import { Repository } from "typeorm";
import { AuthServiceException } from "../exceptions/AuthServiceException";
const MySQLDataSource = require('../data-source');

/**
 * This method is used to get the repository for a given entity in TypeORM
 * 
 * @param entity Entity
 * @returns Repository corresponding to Entity
 */
export function getRepository(entity: any): Repository<any> {
    try {
        return MySQLDataSource.getRepository(entity);
    } catch (e) {
        throw new AuthServiceException(`Error occurred when finding ${entity} repository`);
    }
}