import mongoose, { Schema } from "mongoose";
import { TOrganization } from "../types/org";

export const organizationSchema = new Schema<TOrganization>({
  clerk_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  admin_delete_enabled: {
    type: Boolean,
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
  default_project: {
    type: String,
    default: null,
  },
  created_at: Date,
  updated_at: Date,
});

const Organization = mongoose.model<TOrganization>(
  "Organization",
  organizationSchema
);

export default Organization;
