"use client";

import { useLocale, useTranslations } from "next-intl";
import { type ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { sendChatMessage, speakReply, type ChatMessage } from "@/lib/api";
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

// A chat message as the UI keeps it: agent replies from the API carry the
// token /speak needs to read them aloud (the greeting and demo replies don't).
type UiMessage = ChatMessage & { speakToken?: string };

// Minimal shape of the browser's speech recognition (Web Speech API), used for
// free dictation. Chrome, Edge and Safari expose it; Firefox does not.
type Recognizer = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  start: () => void;
  stop: () => void;
};

function getRecognizer(): (new () => Recognizer) | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as {
    SpeechRecognition?: new () => Recognizer;
    webkitSpeechRecognition?: new () => Recognizer;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

// Which language to listen in. The visitor's own last message decides when it
// is clear; otherwise the phone or browser language (a better guess for how
// someone speaks than the page they landed on: the English home page gets
// Spanish speakers too); the page locale is the last resort.
function dictationLang(messages: UiMessage[], locale: string): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const es = (lastUser.match(/[áéíóúñ¿¡]|\b(que|para|con|los|las|una|del|quiero|tengo|necesito|puedo|hola)\b/gi) ?? []).length;
  const en = (lastUser.match(/\b(the|and|you|with|for|your|can|is|are|how|what|need|want|hi)\b/gi) ?? []).length;
  if (es !== en) return es > en ? "es-US" : "en-US";
  const device = typeof navigator === "undefined" ? "" : navigator.language.toLowerCase();
  if (device.startsWith("es")) return "es-US";
  if (device.startsWith("en")) return "en-US";
  return locale === "es" ? "es-US" : "en-US";
}

// iPhone/iPad Safari repeats words in continuous mode, so there it listens one
// phrase at a time; other browsers keep listening until the visitor taps again.
const isAppleMobile = () =>
  typeof navigator !== "undefined" && /iPhone|iPad|iPod/.test(navigator.userAgent);

const MAX_DICTATION_MS = 30_000; // never leave the microphone open by accident

// Browser support never changes while the page is open, so nothing to subscribe to.
const noSubscribe = () => () => {};

// Agent replies are plain text with a little markdown. Turn [label](url), bare
// URLs, emails and **bold** into real elements so links can be opened. Built
// as React nodes (never innerHTML), so the text stays escaped, and only
// http(s) URLs become links.
const RICH =
  /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s<]+)|([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

function renderRich(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(RICH)) {
    const [whole, label, labelUrl, bold, bareUrl, email] = match;
    const start = match.index ?? 0;
    let end = start + whole.length;
    if (start > last) nodes.push(text.slice(last, start));
    if (label && labelUrl) {
      nodes.push(<RichLink key={start} href={labelUrl}>{label}</RichLink>);
    } else if (bold) {
      nodes.push(<strong key={start} className="font-semibold text-primary">{bold}</strong>);
    } else if (bareUrl) {
      // A sentence-ending "." or ")" belongs to the text, not the URL.
      const url = bareUrl.replace(/[.,;:!?)]+$/, "");
      end = start + url.length;
      nodes.push(<RichLink key={start} href={url}>{url.replace(/^https?:\/\//, "")}</RichLink>);
    } else if (email) {
      nodes.push(<RichLink key={start} href={`mailto:${email}`}>{email}</RichLink>);
    }
    last = end;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function RichLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="break-all text-brand-300 underline underline-offset-2 transition hover:text-primary"
    >
      {children}
    </a>
  );
}

export function AgentChat() {
  const t = useTranslations("Agent");
  const locale = useLocale();
  const starters = t.raw("starters") as string[];

  // The greeting is derived from the active locale (so it translates on
  // language switch); state only holds the actual exchange.
  const greeting: ChatMessage = { role: "assistant", content: t("greeting") };
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Read-aloud: one reply plays at a time; `speaking` is its index in the
  // conversation (null when silent).
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [speaking, setSpeaking] = useState<number | null>(null);

  // Dictation: only offered where the browser supports it. The server snapshot
  // (false) keeps the server HTML and hydration in sync; the browser then
  // reads the real support.
  const canDictate = useSyncExternalStore(noSubscribe, () => Boolean(getRecognizer()), () => false);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const recognizerRef = useRef<Recognizer | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  // Stop any reply still playing when the chat unmounts.
  useEffect(() => () => audioRef.current?.pause(), []);

  async function play(index: number, message: UiMessage) {
    audioRef.current?.pause();
    if (speaking === index || !message.speakToken) {
      setSpeaking(null); // a second tap on the same reply stops it
      return;
    }
    setSpeaking(index);
    try {
      const audio = await speakReply(message.content, message.speakToken);
      const player = new Audio(`data:audio/mpeg;base64,${audio}`);
      audioRef.current = player;
      player.onended = () => setSpeaking(null);
      await player.play();
    } catch {
      setSpeaking(null);
    }
  }

  // Puts what the visitor said in the input box, so they can check it before
  // sending (recognition can mishear names).
  // Tap to start, tap again to stop. The words appear in the input while the
  // visitor speaks, so they can see it is hearing them and fix a misheard word
  // before sending.
  function dictate() {
    if (listening) {
      recognizerRef.current?.stop();
      return;
    }
    const Recognition = getRecognizer();
    if (!Recognition) return;
    setMicError(null);
    const before = input.trim();
    const recognizer = new Recognition();
    recognizer.lang = dictationLang(messages, locale);
    recognizer.continuous = !isAppleMobile();
    recognizer.interimResults = true;
    recognizer.onresult = (event) => {
      // results holds everything heard in this session, provisional and final.
      const heard = Array.from(event.results, (result) => result[0]?.transcript ?? "").join(" ");
      setInput(`${before} ${heard}`.replace(/\s+/g, " ").trim());
    };
    const timer = window.setTimeout(() => recognizer.stop(), MAX_DICTATION_MS);
    recognizer.onend = () => {
      window.clearTimeout(timer);
      recognizerRef.current = null;
      setListening(false);
    };
    // Tell the visitor why nothing happened instead of failing silently.
    recognizer.onerror = (event) => {
      setListening(false);
      if (event.error === "aborted") return;
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setMicError(t("micDenied"));
      } else if (event.error === "no-speech") {
        setMicError(t("micNoSpeech"));
      } else {
        setMicError(t("micError"));
      }
    };
    recognizerRef.current = recognizer;
    setListening(true);
    recognizer.start();
  }

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || busy) return;

    const next = [...messages, { role: "user" as const, content: clean }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const { reply, speakToken } = await sendChatMessage([greeting, ...next], locale, getVisitorId());
      setMessages((m) => [...m, { role: "assistant", content: reply, speakToken }]);
    } catch (error) {
      // No backend → demo replies; a real failure → tell the user.
      const content = isDemoModeError(error) ? buildDemoReply(clean, locale) : t("error");
      setMessages((m) => [...m, { role: "assistant", content }]);
    } finally {
      setBusy(false);
    }
  }

  const conversation: UiMessage[] = [greeting, ...messages];

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
              className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-brand-500/15 text-primary"
                  : "bg-white/4 text-secondary"
              }`}
            >
              {message.role === "assistant" ? renderRich(message.content) : message.content}
              {message.speakToken && (
                <button
                  type="button"
                  onClick={() => play(index, message)}
                  aria-label={speaking === index ? t("stop") : t("listen")}
                  className={`mt-2 flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                    speaking === index
                      ? "border-brand-400 bg-brand-500/30 text-primary"
                      : "border-brand-400/50 bg-brand-500/10 text-brand-300 hover:bg-brand-500/25 hover:text-primary"
                  }`}
                >
                  {speaking === index ? <StopIcon /> : <SpeakerIcon />}
                  {speaking === index ? t("stop") : t("listen")}
                </button>
              )}
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
            onChange={(e) => {
              setInput(e.target.value);
              setMicError(null);
            }}
            placeholder={listening ? t("listening") : t("placeholder")}
            className="flex-1 rounded-lg bg-transparent px-2 py-1 text-sm text-primary placeholder:text-subtle focus:outline-none focus:ring-1 focus:ring-brand-400/60"
          />
          {canDictate && (
            <button
              type="button"
              onClick={dictate}
              disabled={busy}
              aria-label={listening ? t("stopDictation") : t("dictate")}
              title={listening ? t("stopDictation") : t("dictate")}
              className={`rounded-lg border p-2 transition disabled:opacity-60 ${
                listening
                  ? "animate-pulse border-brand-400 bg-brand-500/30 text-primary"
                  : "border-brand-400/50 bg-brand-500/10 text-brand-300 hover:bg-brand-500/25 hover:text-primary"
              }`}
            >
              {listening ? <StopIcon /> : <MicIcon />}
            </button>
          )}
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="btn-primary px-3.5 py-1.5 text-xs disabled:opacity-40"
          >
            {t("send")}
          </button>
        </div>
        {micError && <p className="px-2 pt-1.5 text-xs text-brand-300">{micError}</p>}
        <p className="px-2 pt-1.5 text-[10px] text-subtle">{t("disclaimer")}</p>
      </form>
    </div>
  );
}

// Small stroke icons for the voice buttons; they take the button's text color.
function SpeakerIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </svg>
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
