import express from "express";
import { checkAuth } from "../middlewares/checkAuth";
import {
  checkProjectSlug,
  createProject,
  getAllProjects,
  getProjectBySlug,
} from "../controllers/projects";

const router = express.Router();

router.use(checkAuth);

router.get("/:org_slug/check-slug", checkProjectSlug);
router.post("/:org_slug/create", createProject);
router.get("/:org_slug/all", getAllProjects);
router.get("/:org_slug/:project_slug", getProjectBySlug);

export default router;
