import express from "express";
import { PermissionController } from "../controllers/PermissionController";

const PermissionRouter = express.Router();
const permissionController = new PermissionController();

PermissionRouter.post("", permissionController.createPermission);

export default PermissionRouter;