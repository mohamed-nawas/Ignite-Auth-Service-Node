import { Request, Response, NextFunction } from "express";
import { PermissionService } from "../services/PermissionService";
import { PermissionCreateRequestDto } from "../dto/request/PermissionCreateRequestDto";
import { Logger } from "tslog";
import { plainToClass } from "class-transformer";
import { SuccessResponseStatusType } from "../enums/SuccessResponseStatusType";
import { ErrorResponseStatusType } from "../enums/ErrorResponseStatusType";
import { ResponseStatusTypeProperty } from "../enums/ResponseStatusTypeProperty";
import { getErrorResponseWrapper, getSuccessResponseWrapper } from "./Controller";
import PermissionResponseDto from "../dto/response/PermissionResponseDto";
import Permission from "../entities/Permission";


/**
 * PermissionController
 */
export class PermissionController {

    private static permissionService: PermissionService = new PermissionService();
    private static logger: Logger<unknown> = new Logger();

    /**
     * This API is used to create a new Permission
     * 
     * @param RequestBody PermissionCreateRequestDto
     * @returns success/error response
     */
    public async createPermission(req: Request<{}, {}, PermissionCreateRequestDto>, res: Response, next: NextFunction): Promise<void> {
        const requestDto = plainToClass(PermissionCreateRequestDto, req.body);
        if (!requestDto.isRequiredAvailable()) {
            PermissionController.logger.error("Required fields missing in permission create request DTO for creating permission");
            res.status(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getErrorResponseWrapper(ErrorResponseStatusType.MISSING_REQUIRED_FIELDS));
        }

        try {
            const permission = new Permission(requestDto);
            await PermissionController.permissionService.createPermission(permission);

            const permissionResponseDto = new PermissionResponseDto(permission);

            PermissionController.logger.info("Successfully created the permission, responseDto: ", permissionResponseDto.toJson());
            res.status(SuccessResponseStatusType.CREATE_PERMISSION.getProperty(ResponseStatusTypeProperty.CODE))
            .send(getSuccessResponseWrapper(SuccessResponseStatusType.CREATE_PERMISSION, permissionResponseDto));
        } catch (e) {
            next(e);
        }
    }
}