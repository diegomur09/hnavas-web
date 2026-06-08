import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on every path except Next internals, API routes and files with an
  // extension (static assets). This keeps locale negotiation off /_next, etc.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
