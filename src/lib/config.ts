// Hard-coded runtime constants, kept out of components (single place to
// change endpoints/keys). Site content/brand constants live in site.ts.

// Base URL of the agent/contact backend. Unset → the chat falls back to its
// built-in demo replies and the contact form falls back to mailto.
export const AGENT_URL = process.env.NEXT_PUBLIC_AGENT_URL;

// localStorage key for the anonymous visitor id the agent uses to remember
// returning visitors across sessions.
export const VISITOR_KEY = "hnavas_visitor_id";
