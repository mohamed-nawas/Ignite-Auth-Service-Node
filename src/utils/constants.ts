
/**
 * Constants definition
 */
export const PORT = process.env.PORT || 8000;

export const TOKEN_ISSUER = "Computic Solutions";
export const TOKEN_SUBJECT = "Auth token";
export const TOKEN_AUDIENCE = "Client_Identity";

export const BASE_URL = "/api/v1";

export const AUTH_BASE_URL = BASE_URL + "/auth";
export const ROLE_BASE_URL = BASE_URL + "/roles";
export const PERMISSION_BASE_URL = BASE_URL + "/permissions";

export const REGISTER_URL = AUTH_BASE_URL + "/register";
export const LOGIN_URL = AUTH_BASE_URL + "/login";