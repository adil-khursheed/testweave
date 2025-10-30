import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/winstonLogger";
import { CustomError } from "../../middlewares/error";
import Organization from "../../models/organizationModel";

export const getOrganizationBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { org_slug } = req.params;
    if (!org_slug) {
      return next(new CustomError("Missing required parameter: org_slug", 400));
    }

    const organization = await Organization.findOne({ slug: org_slug });
    if (!organization) {
      return next(new CustomError("Organization not found", 404));
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Organization fetched successfully",
        organization,
      });
  } catch (error) {
    logger.error(error);
    next(
      new CustomError(
        error instanceof Error ? error.message : "Internal server error"
      )
    );
  }
};
