import express from "express";
import { RoleController } from "../controllers/RoleController";

const RoleRouter = express.Router();
const roleController = new RoleController();

RoleRouter.post("/", roleController.createRole);

export default RoleRouter;