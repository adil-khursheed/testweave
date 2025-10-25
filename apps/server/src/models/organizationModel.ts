import { OrganizationJSON } from "@clerk/express";
import mongoose, { Schema } from "mongoose";

export const organizationSchema = new Schema<OrganizationJSON>({
  id: {
    type: String,
    required: true,
  },
  admin_delete_enabled: {
    type: Boolean,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  has_image: {
    type: Boolean,
  },
  image_url: {
    type: String,
  },
  max_allowed_memberships: {
    type: Number,
    required: true,
  },
  members_count: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
  pending_invitations_count: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    required: true,
  },
  created_at: Date,
  updated_at: Date,
});

const Organization = mongoose.model<OrganizationJSON>(
  "Organization",
  organizationSchema
);

export default Organization;
