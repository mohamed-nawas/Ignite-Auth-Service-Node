import { Request, Response, NextFunction } from "express";
import { RoleService } from "../services/RoleService";
import { RoleCreateRequestDto } from "../dto/request/RoleCreateRequestDto";
import { Logger } from "tslog";
import { plainToClass } from "class-transformer";
import { SuccessResponseStatusType } from "../enums/SuccessResponseStatusType";
import { ErrorResponseStatusType } from "../enums/ErrorResponseStatusType";
import { ResponseStatusTypeProperty } from "../enums/ResponseStatusTypeProperty";
import { getErrorResponseWrapper, getSuccessResponseWrapper } from "./Controller";
import RoleResponseDto from "../dto/response/RoleResponseDto";
import Role from "../entities/Role";
import { PermissionService } from "../services/PermissionService";
import { DtoProperty } from "../enums/DtoProperty";
import Permission from "../entities/Permission";

/**
 * RoleController
 */
export class RoleController {

    private static roleService: RoleService = new RoleService();
    private static permissionService: PermissionService = new PermissionService();
    private static logger: Logger<unknown> = new Logger();

    /**
     * This API is used to create a new Role
     * 
     * @param RequestBody RoleCreateRequestDto
     * @returns success/error response
     */
    public async createRole(req: Request<{}, {}, RoleCreateRequestDto>, res: Response, next: NextFunction): Promise<void> {
        const requestDto = plainToClass(RoleCreateRequestDto, req.body);
        if (!requestDto.isRequiredAvailable()) {
            RoleController.logger.error("Required fields missing in role create request DTO for creating role");
            res.status(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS));
        }

        try {
            const permissions = new Array<Permission>();
            requestDto.getProperty(DtoProperty.PERMISSIONS).forEach(async (permissionType: { toString: () => string; }) => {
                const permission = await RoleController.permissionService.findByPermission(permissionType.toString());
                permissions.push(permission);
            });

            const role = new Role(requestDto, permissions);
            await RoleController.roleService.createRole(role);

            const roleResponseDto = new RoleResponseDto(role);

            RoleController.logger.info("Successfully created the role, responseDto: ", roleResponseDto.toJson());
            res.status(SuccessResponseStatusType.CREATE_ROLE.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getSuccessResponseWrapper(SuccessResponseStatusType.CREATE_ROLE, roleResponseDto));
        } catch (e) {
            next(e);
        }
    }
}