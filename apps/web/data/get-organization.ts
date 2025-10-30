import "server-only";

import { cache } from "react";

export const getOrganization = cache(
  async (orgSlug: string, token?: string | null) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/organizations/${orgSlug}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "force-cache",
          next: {
            tags: [`organization: ${orgSlug}`],
          },
        }
      );

      const data: {
        success: boolean;
        message: string;
        organization: TOrganization;
      } = await res.json();

      return data;
    } catch (error) {
      console.log(error);

      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);
