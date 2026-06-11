// All HTTP requests to the backend live here — components import these
// helpers instead of calling fetch themselves.

import { AGENT_URL } from "./config";

export type ChatMessage = { role: "user" | "assistant"; content: string };

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
    .then((res) => {
      if (!res.ok) return Promise.reject(new Error(`agent-${res.status}`));
      return res.json();
    })
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
  }).then((res) => {
    if (!res.ok) return Promise.reject(new Error(`contact-${res.status}`));
    return res.json();
  });
}
