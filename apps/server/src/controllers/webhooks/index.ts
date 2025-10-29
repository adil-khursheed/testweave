import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../middlewares/error";
import { verifyWebhook } from "@clerk/express/webhooks";
import User from "../../models/userModel";
import Organization from "../../models/organizationModel";
import OrgMembership from "../../models/orgMembershipModel";

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
        members_count,
      } = evt.data;

      const organization = await Organization.findOneAndUpdate(
        { clerk_id: id },
        {
          $set: {
            admin_delete_enabled,
            created_by,
            has_image,
            image_url,
            max_allowed_memberships,
            members_count,
            name,
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
      await Organization.findOneAndDelete({ clerk_id: id });

      res.status(200).json({
        success: true,
        message: "Organization deleted successfully",
      });
    }

    // Create or Update Organization Membership
    if (
      eventType === "organizationMembership.created" ||
      eventType === "organizationMembership.updated"
    ) {
      const {
        id,
        organization,
        public_user_data,
        role,
        permissions,
        updated_at,
        created_at,
      } = evt.data;

      const user = await User.findOne({ clerk_id: public_user_data.user_id });
      if (!user) {
        return next(new CustomError("User not found", 404));
      }

      const org = await Organization.findOne({ clerk_id: organization.id });
      if (!org) {
        return next(new CustomError("Organization not found", 404));
      }

      const orgMembership = await OrgMembership.findOneAndUpdate(
        {
          clerk_id: id,
        },
        {
          $set: {
            organization_id: org._id,
            user_id: user._id,
            permissions,
            role,
            created_at,
            updated_at,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      org.members_count = organization.members_count!;

      await Promise.all([orgMembership.save(), org.save()]);

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
        password_enabled,
        create_organization_enabled,
        create_organizations_limit,
        banned,
        created_at,
        updated_at,
      } = evt.data;

      const user = await User.findOneAndUpdate(
        { clerk_id: id },
        {
          $set: {
            email_addresses,
            first_name,
            last_name,
            image_url,
            last_sign_in_at,
            password_enabled,
            create_organization_enabled,
            create_organizations_limit,
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
      await User.findOneAndDelete({ clerk_id: id });

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
