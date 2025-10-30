import mongoose from "mongoose";

type TOrganization = {
  _id: mongoose.Types.ObjectId;
  clerk_id: string;
  name: string;
  slug: string;
  admin_delete_enabled: boolean;
  created_by: string;
  has_image: boolean;
  image_url: string;
  max_allowed_memberships: number;
  members_count: number;
  default_project: string | null;
  created_at: Date;
  updated_at: Date;
};

type TOrgMembership = {
  _id: mongoose.Types.ObjectId;
  clerk_id: string;
  organization_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  role: "org:admin" | "org:member";
  permissions: string[];
  created_at: Date;
  updated_at: Date;
};
