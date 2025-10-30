type TOrganization = {
  _id: string;
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
  created_at: string;
  updated_at: string;
};
