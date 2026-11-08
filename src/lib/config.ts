// Hard-coded runtime constants, kept out of components (single place to
// change endpoints/keys). Site content/brand constants live in site.ts.

// Base URL of the agent/contact backend. Unset → the chat falls back to its
// built-in demo replies and the contact form falls back to mailto.
export const AGENT_URL = process.env.NEXT_PUBLIC_AGENT_URL;

// Auth UI feature flag. Defaults to ON, so it shows locally and on QA (where
// the TripleTen reviewer evaluates the full sign up / sign in flow). Production
// sets NEXT_PUBLIC_ENABLE_AUTH="false" to hide the auth UI from real visitors.
export const AUTH_ENABLED = process.env.NEXT_PUBLIC_ENABLE_AUTH !== "false";

// localStorage key for the anonymous visitor id the agent uses to remember
// returning visitors across sessions.
export const VISITOR_KEY = "hnavas_visitor_id";

// localStorage key for the signed-in user's JWT. On mount the App reads this
// and validates it against the server before trusting the session.
export const AUTH_TOKEN_KEY = "hnavas_auth_token";

// Client-side form rules — mirror the backend Joi schemas so the user never
// sends a request that the API would reject (see backend validation.js).
export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MIN_LENGTH = 2;

// Google tag ID, set per environment at build time: the GTM-... ID Google
// gives for a Google tag / Tag Manager container (production uses
// GTM-TXFX3C67, which sends to GA4 G-B3MQG08955), or a plain GA4 G-... ID.
// Unset (local, QA) means no analytics script at all. Only a well-formed ID
// is accepted because it is written into an inline script.
const rawTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? "";
export const GOOGLE_TAG_ID = /^(G|GTM)-[A-Z0-9]{4,20}$/.test(rawTagId) ? rawTagId : undefined;
