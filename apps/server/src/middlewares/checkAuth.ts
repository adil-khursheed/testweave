import { NextFunction, Request, Response } from "express";
import { TUser } from "../types/users";
import { logger } from "../utils/winstonLogger";
import { CustomError } from "./error";
import { getAuth } from "@clerk/express";
import User from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: TUser;
    }
  }
}

export const checkAuth = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return next(new CustomError("Unauthorized request", 401));
    }

    const user = await User.findOne({ clerk_id: userId });
    if (!user) {
      return next(new CustomError("Unauthorized request", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error(error);
    next(
      new CustomError(
        error instanceof Error ? error.message : "Internal server error"
      )
    );
  }
};
