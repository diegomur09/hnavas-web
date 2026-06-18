// All HTTP requests to the backend live here — components import these
// helpers instead of calling fetch themselves.

import { AGENT_URL } from "./config";

// Shared response handler. Every request pipes its response through this so the
// `res.ok` check lives in exactly one place instead of being repeated in each
// helper. On a non-2xx status it rejects with a coded Error (`<prefix>-<status>`,
// e.g. "auth-401") that callers map to a user-facing message; otherwise it
// parses and returns the JSON body.
function checkResponse<T>(res: Response, errorPrefix: string): Promise<T> {
  if (!res.ok) return Promise.reject(new Error(`${errorPrefix}-${res.status}`));
  return res.json();
}

export type ChatMessage = { role: "user" | "assistant"; content: string };

export type User = { _id: string; name: string; email: string; role?: string };

export type SignupPayload = { name: string; email: string; password: string };
export type SigninPayload = { email: string; password: string };

// POST /signup — register a new user. Resolves with the created (public) user.
export function signUp(payload: SignupPayload): Promise<User> {
  if (!AGENT_URL) return Promise.reject(new Error("auth-not-configured"));
  return fetch(`${AGENT_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((res) => checkResponse<User>(res, "auth"));
}

// POST /signin — exchange credentials for a JWT.
export function signIn(payload: SigninPayload): Promise<{ token: string }> {
  if (!AGENT_URL) return Promise.reject(new Error("auth-not-configured"));
  return fetch(`${AGENT_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((res) => checkResponse<{ token: string }>(res, "auth"));
}

// GET /users/me — validate a stored token against the server and load the
// profile behind it. Used on mount to restore a session from localStorage.
export function fetchCurrentUser(token: string): Promise<User> {
  if (!AGENT_URL) return Promise.reject(new Error("auth-not-configured"));
  return fetch(`${AGENT_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => checkResponse<User>(res, "auth"));
}

export type ContactPayload = {
  name: string;
  email: string;
  project: string;
  locale: string;
};

// Rejects with a coded Error so callers can tell "backend not configured /
// unavailable" (demo mode) apart from a real failure.
export function sendChatMessage(
  messages: ChatMessage[],
  locale: string,
  visitorId?: string,
): Promise<string> {
  if (!AGENT_URL) return Promise.reject(new Error("agent-not-configured"));
  return fetch(`${AGENT_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, locale, visitorId }),
  })
    .then((res) => checkResponse<{ reply?: string }>(res, "agent"))
    .then((data: { reply?: string }) => {
      if (!data.reply) return Promise.reject(new Error("agent-empty"));
      return data.reply;
    });
}

export function sendContactForm(payload: ContactPayload): Promise<{ ok: boolean }> {
  if (!AGENT_URL) return Promise.reject(new Error("contact-not-configured"));
  return fetch(`${AGENT_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((res) => checkResponse<{ ok: boolean }>(res, "contact"));
}
