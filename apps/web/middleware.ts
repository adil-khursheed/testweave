import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getOrganization } from "./data/get-organization";

const isPublicRoute = createRouteMatcher(["/", "/login(.*)", "/signup(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  const { orgSlug, userId, getToken } = await auth();

  if (userId && isPublicRoute(req)) {
    const token = await getToken();

    if (orgSlug) {
      const org = await getOrganization(orgSlug, token);

      if (org.organization.default_project) {
        return NextResponse.redirect(
          new URL(
            `/${orgSlug}/${org.organization.default_project}/dashboard`,
            req.url
          )
        );
      } else {
        return NextResponse.redirect(new URL("/project/create", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/workspace", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
