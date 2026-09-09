"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sendChatMessage, type ChatMessage } from "@/lib/api";
import { VISITOR_KEY } from "@/lib/config";

// A stable, anonymous id stored in the browser so the agent can recognize a
// returning visitor across sessions. Created on first use; SSR-safe (no-op on
// the server). Not personal data — just a random UUID.
function getVisitorId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return undefined; // private mode / storage blocked → just no memory
  }
}

// Errors that mean "backend not configured/available" rather than a real
// failure — those degrade to the built-in demo replies instead of an error.
function isDemoModeError(error: unknown): boolean {
  const reason = error instanceof Error ? error.message : "";
  return reason === "agent-not-configured" || reason === "agent-503";
}

export function AgentChat() {
  const t = useTranslations("Agent");
  const locale = useLocale();
  const starters = t.raw("starters") as string[];

  // The greeting is derived from the active locale (so it translates on
  // language switch); state only holds the actual exchange.
  const greeting: ChatMessage = { role: "assistant", content: t("greeting") };
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;

    const next = [...messages, { role: "user" as const, content: clean }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const reply = await sendChatMessage([greeting, ...next], locale, getVisitorId());
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (error) {
      // No backend → demo replies; a real failure → tell the user.
      const content = isDemoModeError(error) ? buildDemoReply(clean, locale) : t("error");
      setMessages((m) => [...m, { role: "assistant", content }]);
    } finally {
      setBusy(false);
    }
  }

  const conversation = [greeting, ...messages];

  return (
    <div className="glass-card flex h-[26rem] flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-400" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-medium text-primary">{t("title")}</p>
          <p className="text-[11px] text-body">{t("subtitle")}</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {conversation.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-brand-500/15 text-primary"
                  : "bg-white/4 text-secondary"
              }`}
            >
              {message.content}
            </div>
          </motion.div>
        ))}

        {busy && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white/4 px-3.5 py-2 text-sm text-body">
              <span className="inline-flex gap-1">
                <Dot /> <Dot delay={0.15} /> <Dot delay={0.3} />
              </span>
            </div>
          </div>
        )}

        {/* Starters only before the first user message */}
        {messages.length === 0 && !busy && (
          <div className="flex flex-wrap gap-2 pt-1">
            {starters.map((starter) => (
              <button
                key={starter}
                onClick={() => send(starter)}
                className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-secondary transition hover:border-brand-400/40 hover:text-primary"
              >
                {starter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-white/8 p-2.5"
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("placeholder")}
            className="flex-1 rounded-lg bg-transparent px-2 py-1 text-sm text-primary placeholder:text-subtle focus:outline-none focus:ring-1 focus:ring-brand-400/60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="btn-primary px-3.5 py-1.5 text-xs disabled:opacity-40"
          >
            {t("send")}
          </button>
        </div>
        <p className="px-2 pt-1.5 text-[10px] text-subtle">{t("disclaimer")}</p>
      </form>
    </div>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-brand-400"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}

// Local demo brain so the chat works before the backend is live.
function buildDemoReply(text: string, locale: string): string {
  const isSpanish = locale === "es";
  const question = text.toLowerCase();
  const mentions = (...keywords: string[]) => keywords.some((word) => question.includes(word));

  if (mentions("price", "cost", "precio", "cuesta", "cuánto", "cuanto"))
    return isSpanish
      ? "Cada proyecto se cotiza a medida según el alcance. Cuéntame qué necesitas y te doy un rango. ¿Quieres dejar tu email para que Diego te contacte?"
      : "Every project is quoted to scope. Tell me what you need and I'll give you a range. Want to leave your email so Diego can reach out?";
  if (mentions("aws", "cloud", "lambda", "serverless"))
    return isSpanish
      ? "Sí — Diego es AWS-native: 60+ Lambdas, 40 tablas DynamoDB y 16 APIs en producción hoy. Diseña arquitectura serverless, migraciones y optimización de costos."
      : "Yes — Diego is AWS-native: 60+ Lambdas, 40 DynamoDB tables and 16 APIs in production today. He does serverless architecture, migrations and cost optimization.";
  if (mentions("ai", "automation", "chatbot", "ia", "automat", "email"))
    return isSpanish
      ? "Justo lo que estás usando ahora 🙂 Diego construye automatización con IA sobre Claude y OpenAI: emails personalizados, agentes y nurture de leads. ¿Qué quieres automatizar?"
      : "Exactly what you're using right now 🙂 Diego builds AI automation on Claude and OpenAI: personalized emails, agents and lead nurture. What do you want to automate?";
  if (mentions("saas", "app", "payment", "pago", "web", "website", "sitio", "página", "pagina"))
    return isSpanish
      ? "Definitivamente. Diego ha construido SaaS en producción con pagos (200+ clientes) y plataformas en tiempo real como ScoreFlow. ¿Es una app nueva o una mejora?"
      : "Definitely. Diego has shipped production SaaS with payments (200+ customers) and real-time platforms like ScoreFlow. Is this a new app or an improvement?";
  return isSpanish
    ? "Buena pregunta. Diego construye apps full-stack, sistemas en AWS y automatización con IA — bilingüe EN/ES desde Denver. ¿Me cuentas un poco más de tu proyecto?"
    : "Great question. Diego builds full-stack apps, AWS systems and AI automation — bilingual EN/ES out of Denver. Can you tell me a bit more about your project?";
}
