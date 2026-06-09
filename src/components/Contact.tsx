"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

const CONTACT_URL = process.env.NEXT_PUBLIC_AGENT_URL;

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const project = String(data.get("project") ?? "");

    setStatus("sending");

    try {
      // Try the configured backend first; fall back to a mailto so the lead is
      // never lost even before the contact endpoint is live.
      if (CONTACT_URL) {
        const res = await fetch(`${CONTACT_URL}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, project, locale }),
        });
        if (!res.ok) throw new Error(`contact-${res.status}`);
      } else {
        openMailto(name, email, project);
      }
      setStatus("success");
      form.reset();
    } catch {
      openMailto(name, email, project);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t border-white/6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Pitch */}
        <div>
          <span className="data-mono text-xs uppercase tracking-widest text-brand-400">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-md text-base text-body">{t("subtitle")}</p>

          <a
            href={`mailto:${SITE.email}`}
            className="data-mono mt-6 block text-sm text-secondary transition hover:text-brand-300"
          >
            {SITE.email}
          </a>

          <a
            href={SITE.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-5 inline-flex items-center gap-2 px-4 py-2.5 text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {t("bookCall")}
          </a>

          <p className="mt-4 text-xs text-subtle">{t("orChat")}</p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card space-y-4 p-7"
        >
          <Field label={t("name")} name="name" type="text" />
          <Field label={t("emailLabel")} name="email" type="email" />

          <label className="block">
            <span className="text-sm text-secondary">{t("project")}</span>
            <textarea
              name="project"
              required
              rows={4}
              className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/3 px-3.5 py-2.5 text-sm text-primary placeholder:text-subtle focus:border-brand-400/50 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary w-full px-5 py-3 text-sm disabled:opacity-50"
          >
            {status === "sending" ? t("sending") : t("send")}
          </button>

          {status === "success" && (
            <p className="text-sm text-up">{t("success")}</p>
          )}
          {status === "error" && (
            <p className="text-sm text-down">{t("error")}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <label className="block">
      <span className="text-sm text-secondary">{label}</span>
      <input
        name={name}
        type={type}
        required
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/3 px-3.5 py-2.5 text-sm text-primary placeholder:text-subtle focus:border-brand-400/50 focus:outline-none"
      />
    </label>
  );
}

function openMailto(name: string, email: string, project: string) {
  const subject = encodeURIComponent(`Project inquiry — ${name || "Website"}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${project}`
  );
  window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
}
