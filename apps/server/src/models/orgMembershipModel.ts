import mongoose, { Schema } from "mongoose";
import { TOrgMembership } from "../types/org";

const orgMembershipSchema = new Schema<TOrgMembership>({
  clerk_id: {
    type: String,
    required: true,
    unique: true,
  },
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: ["org:admin", "org:member"],
    required: true,
  },
  permissions: [{ type: String }],
  created_at: Date,
  updated_at: Date,
});

const OrgMembership = mongoose.model<TOrgMembership>(
  "OrgMembership",
  orgMembershipSchema
);

export default OrgMembership;
