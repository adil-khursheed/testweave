import mongoose, { Schema } from "mongoose";
import { TUser } from "../types/users";

const emailSchema = new Schema({
  email_address: {
    type: String,
    required: true,
  },
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

const userSchema = new Schema<TUser>({
  clerk_id: {
    type: String,
    required: true,
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
  organizations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  ],
  banned: {
    type: Boolean,
    default: false,
  },
  created_at: Date,
  updated_at: Date,
});

const User = mongoose.model<TUser>("User", userSchema);

export default User;
