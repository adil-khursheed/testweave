import mongoose from "mongoose";

type TProject = {
  _id: mongoose.Types.ObjectId;
  org_id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  base_url: string;
  description: string | null;
  environment: "production" | "staging" | "development";
  created_by: mongoose.Types.ObjectId;
  tags: string[];
  is_archived: boolean;
  test_count: number;
  last_test_run: Date;
  created_at: Date;
  updated_at: Date;
};
