import { OrganizationMembershipJSON, UserJSON } from "@clerk/express";
import mongoose, { Schema } from "mongoose";
import { organizationSchema } from "./organizationModel";

const emailSchema = new Schema({
  email_address: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  linked_to: [
    {
      id: {
        type: String,
      },
      type: {
        type: String,
      },
    },
  ],
  object: String,
  verification: {
    attempts: {
      type: String,
    },
    status: {
      type: String,
    },
    strategy: {
      type: String,
    },
  },
});

const organizationMembershipSchema = new Schema<OrganizationMembershipJSON>({
  id: {
    type: String,
    required: true,
  },
  organization: organizationSchema,
  role: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<UserJSON>({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: null,
  },
  first_name: {
    type: String,
    default: null,
  },
  last_name: {
    type: String,
    default: null,
  },
  email_addresses: [emailSchema],
  image_url: {
    type: String,
    default: null,
  },
  last_sign_in_at: {
    type: Number,
  },
  password_enabled: {
    type: Boolean,
  },
  create_organization_enabled: {
    type: Boolean,
  },
  create_organizations_limit: {
    type: Number,
  },
  organization_memberships: {
    type: [organizationMembershipSchema],
    default: null,
  },
  banned: {
    type: Boolean,
    default: false,
  },
  created_at: Date,
  updated_at: Date,
});

const User = mongoose.model<UserJSON>("User", userSchema);

export default User;
