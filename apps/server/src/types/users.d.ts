import mongoose from "mongoose";

type TEmailAddress = {
  email_address: string;
  verification: {
    attempts: string;
    status: string;
    strategy: string;
  };
};

type TUser = {
  _id: mongoose.Types.ObjectId;
  clerk_id: string;
  first_name: string | null;
  last_name: string | null;
  email_addresses: TEmailAddress[];
  image_url: string | null;
  last_sign_in_at: number;
  password_enabled: boolean;
  create_organization_enabled: boolean;
  create_organizations_limit: number;
  organizations: [mongoose.Types.ObjectId];
  banned: boolean;
  created_at: Date;
  updated_at: Date;
};
