import express from "express";
import { getOrganizationBySlug } from "../controllers/organizations";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.use(checkAuth);

router.get("/:org_slug", getOrganizationBySlug);

export default router;
