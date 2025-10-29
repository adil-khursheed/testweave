import mongoose, { Schema } from "mongoose";
import { TProject } from "../types/project";

const projectSchema = new Schema<TProject>({
  org_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  base_url: {
    type: String,
    required: true,
  },
  description: String,
  environment: {
    type: String,
    enum: ["production", "staging", "development"],
    default: "production",
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [String],
  is_archived: {
    type: Boolean,
    default: false,
  },
  test_count: {
    type: Number,
    default: 0,
  },
  last_test_run: Date,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

projectSchema.index({ org_id: 1, slug: 1 }, { unique: true });
projectSchema.index({ org_id: 1, is_archived: 1 });

const Project = mongoose.model<TProject>("Project", projectSchema);

export default Project;
