import { clerkMiddleware, createRouteMatcher } from "@northware/auth/server";

const isPublicRoute = createRouteMatcher(["/login(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    await auth.protect({
      unauthenticatedUrl: url.toString(),
    });
  }
});

// TODO: Prüfung, ob der Nutzer die nötigen Berechtigungen hat um die App zu nutzen, ansonsten auf eine Seite weiterleiten auf der der Nutzer eine andere App wählen kann

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
