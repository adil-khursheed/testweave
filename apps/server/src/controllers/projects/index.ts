import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../middlewares/error";
import Organization from "../../models/organizationModel";
import Project from "../../models/projectModel";
import { logger } from "../../utils/winstonLogger";

export const checkProjectSlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.query;
    if (!slug) {
      return next(
        new CustomError("Missing required parameter: slug and org_slug", 400)
      );
    }

    const existing_project = await Project.findOne({ slug });
    if (existing_project) {
      return next(
        new CustomError(
          "This slug is already taken. Please try a different one",
          400
        )
      );
    }

    res.status(200).json({
      success: true,
      message: "Slug is available",
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

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, slug, base_url, description, environment, tags } = req.body;
    const { org_slug } = req.params;

    if (!name || !slug || !base_url) {
      return next(
        new CustomError(
          "Missing required parameters: name,slug and base_url",
          400
        )
      );
    }

    if (!org_slug) {
      return next(new CustomError("Missing organization slug", 400));
    }

    const organization = await Organization.findOne({ slug: org_slug });
    if (!organization) {
      return next(
        new CustomError(`No organization found with the slug ${org_slug}`, 404)
      );
    }

    const existing_project = await Project.findOne({
      org_id: organization._id,
      slug,
    });
    if (existing_project) {
      return next(
        new CustomError("Project with this name and slug already exist ", 400)
      );
    }

    const project = await Project.create({
      org_id: organization._id,
      name,
      slug,
      base_url,
      description,
      environment,
      tags: Array.isArray(tags) ? tags : [],
      created_by: req.user?._id,
    });

    if (!organization.default_project) {
      organization.default_project = project.slug;
      await organization.save();
    }

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
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

export const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    logger.error(error);
    next(
      new CustomError(
        error instanceof Error ? error.message : "Internal server error"
      )
    );
  }
};

export const getProjectBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    logger.error(error);
    next(
      new CustomError(
        error instanceof Error ? error.message : "Internal server error"
      )
    );
  }
};
