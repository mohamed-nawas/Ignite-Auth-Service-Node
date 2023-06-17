import express from "express";
import { RoleController } from "../controllers/RoleController";
import { ROLE_BASE_URL } from "../utils/constants";

const RoleRouter = express.Router();
const roleController = new RoleController();

RoleRouter.post(ROLE_BASE_URL, roleController.createRole);

export default RoleRouter;