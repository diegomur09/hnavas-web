"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "user" | "assistant"; content: string };

const AGENT_URL = process.env.NEXT_PUBLIC_AGENT_URL;

export function AgentChat() {
  const t = useTranslations("Agent");
  const locale = useLocale();
  const starters = t.raw("starters") as string[];

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Seed greeting once (and reset if the visitor switches language).
  useEffect(() => {
    setMessages([{ role: "assistant", content: t("greeting") }]);
  }, [t]);

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
      const reply = await callAgent(next, locale);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: demoReply(clean, locale) },
      ]);
    } finally {
      setBusy(false);
    }
  }

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
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-brand-500/15 text-primary"
                  : "bg-white/4 text-secondary"
              }`}
            >
              {m.content}
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
        {messages.length <= 1 && !busy && (
          <div className="flex flex-wrap gap-2 pt-1">
            {starters.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-secondary transition hover:border-brand-400/40 hover:text-primary"
              >
                {s}
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
            className="flex-1 bg-transparent px-2 text-sm text-primary placeholder:text-subtle focus:outline-none"
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

// Calls the deployed agent backend. Throws if not configured/unavailable so
// the UI can fall back to a friendly canned reply.
async function callAgent(messages: Msg[], locale: string): Promise<string> {
  if (!AGENT_URL) throw new Error("agent-not-configured");
  const res = await fetch(`${AGENT_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, locale }),
  });
  if (!res.ok) throw new Error(`agent-${res.status}`);
  const data = (await res.json()) as { reply?: string };
  if (!data.reply) throw new Error("agent-empty");
  return data.reply;
}

// Local demo brain so the chat works before the backend is live.
function demoReply(text: string, locale: string): string {
  const es = locale === "es";
  const q = text.toLowerCase();
  const has = (...k: string[]) => k.some((w) => q.includes(w));

  if (has("price", "cost", "precio", "cuesta", "cuánto", "cuanto"))
    return es
      ? "Cada proyecto se cotiza a medida según el alcance. Cuéntame qué necesitas y te doy un rango. ¿Quieres dejar tu email para que Diego te contacte?"
      : "Every project is quoted to scope. Tell me what you need and I'll give you a range. Want to leave your email so Diego can reach out?";
  if (has("aws", "cloud", "lambda", "serverless"))
    return es
      ? "Sí — Diego es AWS-native: 60+ Lambdas, 40 tablas DynamoDB y 16 APIs en producción hoy. Diseña arquitectura serverless, migraciones y optimización de costos."
      : "Yes — Diego is AWS-native: 60+ Lambdas, 40 DynamoDB tables and 16 APIs in production today. He does serverless architecture, migrations and cost optimization.";
  if (has("ai", "automation", "chatbot", "ia", "automat", "email"))
    return es
      ? "Justo lo que estás usando ahora 🙂 Diego construye automatización con IA sobre Claude y OpenAI: emails personalizados, agentes y nurture de leads. ¿Qué quieres automatizar?"
      : "Exactly what you're using right now 🙂 Diego builds AI automation on Claude and OpenAI: personalized emails, agents and lead nurture. What do you want to automate?";
  if (has("saas", "app", "payment", "pago", "web", "website", "sitio", "página", "pagina"))
    return es
      ? "Definitivamente. Diego ha construido SaaS en producción con pagos (200+ clientes) y plataformas en tiempo real como ScoreFlow. ¿Es una app nueva o una mejora?"
      : "Definitely. Diego has shipped production SaaS with payments (200+ customers) and real-time platforms like ScoreFlow. Is this a new app or an improvement?";
  return es
    ? "Buena pregunta. Diego construye apps full-stack, sistemas en AWS y automatización con IA — bilingüe EN/ES desde Denver. ¿Me cuentas un poco más de tu proyecto?"
    : "Great question. Diego builds full-stack apps, AWS systems and AI automation — bilingual EN/ES out of Denver. Can you tell me a bit more about your project?";
}
