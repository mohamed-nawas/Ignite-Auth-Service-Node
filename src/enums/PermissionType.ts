/**
 * Permission Type
 */
export enum PermissionType {

    CREATE_USER,        // Roles => SUPER_ADMIN
    UPDATE_USER,        // Roles => SUPER_ADMIN, ADMIN
    DELETE_USER,        // Roles => SUPER_ADMIN, ADMIN
    SUSPEND_USER,       // Roles => SUPER_ADMIN, ADMIN
    UPDATE_PROFILE,     // Roles => SUPER_ADMIN, ADMIN, USER
    CREATE_ROLE,        // Roles => SUPER_ADMIN
    UPDATE_ROLE,        // Roles => SUPER_ADMIN, ADMIN
    DELETE_ROLE         // Roles => SUPER_ADMIN, ADMIN
}