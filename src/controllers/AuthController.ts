import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { UserCreateRequestDto } from "../dto/request/UserCreateRequestDto";
import { Logger } from "tslog";
import { plainToClass } from "class-transformer";
import { SuccessResponseStatusType } from "../enums/SuccessResponseStatusType";
import { ErrorResponseStatusType } from "../enums/ErrorResponseStatusType";
import { ResponseStatusTypeProperty } from "../enums/ResponseStatusTypeProperty";
import { getErrorResponseWrapper, getSuccessResponseWrapper } from "./Controller";
import User from "../entities/User";
import UserResponseDto from "../dto/response/UserResponseDto";
import TokenResponseDto from "../dto/response/TokenResponseDto";
import Role from "../entities/Role";
import { DtoProperty } from "../enums/DtoProperty";
import { RoleService } from "../services/RoleService";
import { RoleType } from "../enums/RoleType";
import { LoginRequestDto } from "../dto/request/LoginRequestDto";


/**
 * AuthController
 */
export class AuthController {

    private static authService: AuthService = new AuthService();
    private static roleService: RoleService = new RoleService();
    private static logger: Logger<unknown> = new Logger();

    /**
     * This API is used to register a new User
     * 
     * @param req Express request (body: UserCreateRequestDto)
     * @param res Express response
     * @param next Express next function
     */
    public async register(req: Request<{}, {}, UserCreateRequestDto>, res: Response, next: NextFunction): Promise<void> {
        const requestDto = plainToClass(UserCreateRequestDto, req.body);

        if (!requestDto.isRequiredAvailable()) {
            AuthController.logger.error("Required fields missing in user create request DTO for creating user");
            res.status(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS));
        }

        try {
            const roles = new Array<Role>();
            requestDto.getProperty(DtoProperty.ROLES).forEach( async (roleType: RoleType) => {
                const role = await AuthController.roleService.findByRole(roleType);
                roles.push(role);
            });

            const user = new User(requestDto, roles);
            const token = await AuthController.authService.createUser(user);

            const userResponseDto = new UserResponseDto(user);
            const tokenResponseDto = new TokenResponseDto(requestDto.getProperty(DtoProperty.EMAIL), token);

            AuthController.logger.info("Successfully created the user, responseDto: ", userResponseDto.toJson());
            res.status(SuccessResponseStatusType.CREATE_USER.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getSuccessResponseWrapper(SuccessResponseStatusType.CREATE_USER, tokenResponseDto));
        } catch (e) {
            next(e);
        }
    }

    /**
     * This API is used to login a User to the system
     * 
     * @param req Express request (body: LoginRequestDto)
     * @param res Express response
     * @param next Express next function
     */
    public async login(req: Request<{}, {}, LoginRequestDto>, res: Response, next: NextFunction): Promise<void> {
        const requestDto = plainToClass(LoginRequestDto, req.body);

        if (!requestDto.isRequiredAvailable()) {
            AuthController.logger.error("Required fields missing in login request DTO for logging the user");
            res.status(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS));
        }

        try {
            const token = await AuthController.authService.login(requestDto);
            const tokenResponseDto = new TokenResponseDto(requestDto.getProperty(DtoProperty.EMAIL), token);

            AuthController.logger.info("Successfully logged in the user, responseDto: ", tokenResponseDto.toJson());
            res.status(SuccessResponseStatusType.LOGIN_USER.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getSuccessResponseWrapper(SuccessResponseStatusType.LOGIN_USER, tokenResponseDto));
        } catch (e) {
            next(e);
        }
    }
}