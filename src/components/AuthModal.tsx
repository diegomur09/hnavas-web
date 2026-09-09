"use client";

// The Sign in / Sign up popup. Rendered once at the app root; what it shows is
// driven by the auth context (authView). Forms are validated on the client
// before any request is sent, and the popup closes via the cross, the overlay,
// or the ESC key.

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, type AuthView } from "@/context/AuthContext";
import { NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/config";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthModal() {
  const t = useTranslations("Auth");
  const { authView, closeAuth } = useAuth();
  const isOpen = authView !== null;

  // Close on ESC. The listener is removed when the popup closes / unmounts.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAuth();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeAuth]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay — clicking it closes the popup */}
          <button
            type="button"
            aria-label={t("close")}
            onClick={closeAuth}
            className="absolute inset-0 bg-surface-950/80 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card relative z-10 w-full max-w-sm p-7"
          >
            <button
              type="button"
              aria-label={t("close")}
              onClick={closeAuth}
              className="absolute right-4 top-4 text-secondary transition hover:text-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Keyed by view so switching between sign in / sign up remounts the
                form with fresh fields — no manual reset effect needed. */}
            <AuthForm key={authView} view={authView} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type FormStatus = "idle" | "submitting" | "registered";

function AuthForm({ view }: { view: AuthView }) {
  const t = useTranslations("Auth");
  const { closeAuth, openAuth, registerUser, loginUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const isSignup = view === "signup";

  function validate(): string {
    if (isSignup && name.trim().length < NAME_MIN_LENGTH) return t("errorName");
    if (!EMAIL_PATTERN.test(email)) return t("errorEmail");
    if (isSignup && password.length < PASSWORD_MIN_LENGTH) return t("errorPassword");
    if (!password) return t("errorPassword");
    return "";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setStatus("submitting");

    try {
      if (isSignup) {
        await registerUser({ name: name.trim(), email, password });
        // Success popup: tell the user they're registered and offer to log in.
        setStatus("registered");
      } else {
        await loginUser({ email, password });
        closeAuth(); // signed in → just close
      }
    } catch (caught) {
      setStatus("idle");
      setError(resolveError(caught, t));
    }
  }

  if (status === "registered") {
    return (
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-up/15 text-up">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="mt-4 text-xl font-bold tracking-tight text-primary">{t("registeredTitle")}</h2>
        <p className="mt-2 text-sm text-body">{t("registeredBody")}</p>
        <button
          type="button"
          onClick={() => openAuth("signin")}
          className="btn-primary mt-6 w-full px-5 py-3 text-sm"
        >
          {t("registeredCta")}
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 id="auth-title" className="text-2xl font-bold tracking-tight text-primary">
        {isSignup ? t("signupTitle") : t("signinTitle")}
      </h2>
      <p className="mt-1.5 text-sm text-body">
        {isSignup ? t("signupSubtitle") : t("signinSubtitle")}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        {isSignup && (
          <AuthField
            label={t("nameLabel")}
            type="text"
            value={name}
            placeholder={t("namePlaceholder")}
            autoComplete="name"
            onChange={setName}
          />
        )}
        <AuthField
          label={t("emailLabel")}
          type="email"
          value={email}
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          onChange={setEmail}
        />
        <AuthField
          label={t("passwordLabel")}
          type="password"
          value={password}
          placeholder={t("passwordPlaceholder")}
          autoComplete={isSignup ? "new-password" : "current-password"}
          onChange={setPassword}
        />

        {error && <p className="text-sm text-down">{error}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full px-5 py-3 text-sm disabled:opacity-50"
        >
          {status === "submitting"
            ? t("submitting")
            : isSignup
              ? t("signupSubmit")
              : t("signinSubmit")}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-body">
        {isSignup ? t("haveAccount") : t("noAccount")}{" "}
        <button
          type="button"
          onClick={() => openAuth(isSignup ? "signin" : "signup")}
          className="font-medium text-brand-300 transition hover:text-brand-400"
        >
          {isSignup ? t("signinLink") : t("signupLink")}
        </button>
      </p>
    </>
  );
}

function AuthField({
  label,
  type,
  value,
  placeholder,
  autoComplete,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-secondary">{label}</span>
      <input
        type={type}
        value={value}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/3 px-3.5 py-2.5 text-sm text-primary placeholder:text-subtle focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/60"
      />
    </label>
  );
}

// Map a coded API error to a user-facing message (criteria: the user receives a
// message on error). 401 = bad credentials, 409 = email already registered.
function resolveError(caught: unknown, t: ReturnType<typeof useTranslations>): string {
  const reason = caught instanceof Error ? caught.message : "";
  if (reason === "auth-401") return t("errorCredentials");
  if (reason === "auth-409") return t("errorEmailInUse");
  if (reason === "auth-not-configured") return t("errorUnavailable");
  return t("errorGeneric");
}
