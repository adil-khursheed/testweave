import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../middlewares/error";
import { verifyWebhook } from "@clerk/express/webhooks";
import User from "../../models/userModel";
import Organization from "../../models/organizationModel";

export const clerkWebhooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    // Create or Update Organization
    if (
      eventType === "organization.created" ||
      eventType === "organization.updated"
    ) {
      const {
        id,
        admin_delete_enabled,
        created_at,
        has_image,
        max_allowed_memberships,
        name,
        slug,
        updated_at,
        created_by,
        image_url,
        pending_invitations_count,
        members_count,
      } = evt.data;

      const organization = await Organization.findOneAndUpdate(
        { id },
        {
          $set: {
            admin_delete_enabled,
            created_by,
            has_image,
            image_url,
            max_allowed_memberships,
            members_count,
            name,
            pending_invitations_count,
            slug,
            created_at,
            updated_at,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      await organization.save();

      res.status(eventType === "organization.created" ? 201 : 200).json({
        success: true,
        message: `Organization ${
          eventType === "organization.created" ? "created" : "updated"
        } successfully.`,
      });
    }

    // Delete Organization
    if (eventType === "organization.deleted") {
      const { id } = evt.data;
      await Organization.findOneAndDelete({ id });

      res.status(200).json({
        success: true,
        message: "Organization deleted successfully",
      });
    }

    if (eventType === "organizationInvitation.created") {
      console.log("Invitation => ", evt.data);
      res.status(201).json({
        success: true,
        message: "Invitation sent successfully",
      });
    }

    if (
      eventType === "organizationMembership.created" ||
      eventType === "organizationMembership.updated"
    ) {
      console.log("Membership => ", evt.data);
      res.status(201).json({
        success: true,
        message: "Membership created successfully",
      });
    }

    // Create or Update User
    if (eventType === "user.created" || eventType === "user.updated") {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        image_url,
        last_sign_in_at,
        username,
        password_enabled,
        create_organization_enabled,
        create_organizations_limit,
        organization_memberships,
        banned,
        created_at,
        updated_at,
      } = evt.data;

      const user = await User.findOneAndUpdate(
        { id },
        {
          $set: {
            email_addresses,
            username,
            first_name,
            last_name,
            image_url,
            last_sign_in_at,
            password_enabled,
            create_organization_enabled,
            create_organizations_limit,
            organization_memberships,
            banned,
            created_at,
            updated_at,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      await user.save();

      res.status(eventType === "user.created" ? 201 : 200).json({
        success: true,
        message: `User ${
          eventType === "user.created" ? "created" : "updated"
        } successfully.`,
      });
    }

    // Delete User
    if (eventType === "user.deleted") {
      const { id } = evt.data;
      await User.findOneAndDelete({ id });

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    next(
      new CustomError(
        error instanceof Error ? error.message : "Internal server error"
      )
    );
  }
};
