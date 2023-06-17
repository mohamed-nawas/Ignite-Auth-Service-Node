import express from "express";
import { PermissionController } from "../controllers/PermissionController";
import { PERMISSION_BASE_URL } from "../utils/constants";

const PermissionRouter = express.Router();
const permissionController = new PermissionController();

PermissionRouter.post(PERMISSION_BASE_URL, permissionController.createPermission);

export default PermissionRouter;