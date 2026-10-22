"use client";

// Global auth state for the app. Holds the signed-in user, persists the JWT in
// localStorage, validates a stored token against the server on mount, and owns
// the open/close state of the Sign in / Sign up modal so any component (e.g. the
// Navbar) can trigger it.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  signIn as requestSignIn,
  signUp as requestSignUp,
  fetchCurrentUser,
  type User,
  type SignupPayload,
  type SigninPayload,
} from "@/lib/api";
import { AUTH_TOKEN_KEY } from "@/lib/config";

// Which auth popup is open, if any.
export type AuthView = "signin" | "signup" | null;

type AuthContextValue = {
  user: User | null;
  // True until the initial token check finishes (avoids a header flash).
  isLoading: boolean;
  authView: AuthView;
  openAuth: (view: Exclude<AuthView, null>) => void;
  closeAuth: () => void;
  registerUser: (payload: SignupPayload) => Promise<User>;
  loginUser: (payload: SigninPayload) => Promise<User>;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

function writeToken(token: string) {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch {
    // Private mode / storage blocked — the session just won't persist.
  }
}

function clearToken() {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    // Ignore — nothing to clear.
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authView, setAuthView] = useState<AuthView>(null);

  // On mount, restore the session from localStorage — but only after the server
  // confirms the token is still valid (criteria: validate the JWT by a request,
  // not just local storage).
  useEffect(() => {
    const token = readToken();
    let active = true;

    // setState happens only inside the async callbacks (never synchronously in
    // the effect body) so there's no cascading-render warning. No token → the
    // resolved null path simply flips isLoading off.
    Promise.resolve(token ? fetchCurrentUser(token) : null)
      .then((profile) => {
        if (active && profile) setUser(profile);
      })
      .catch(() => {
        clearToken(); // expired / invalid token → drop it
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const openAuth = useCallback((view: Exclude<AuthView, null>) => {
    setAuthView(view);
  }, []);

  const closeAuth = useCallback(() => {
    setAuthView(null);
  }, []);

  const registerUser = useCallback(
    (payload: SignupPayload) => requestSignUp(payload),
    [],
  );

  const loginUser = useCallback(async (payload: SigninPayload) => {
    const { token } = await requestSignIn(payload);
    writeToken(token);
    const profile = await fetchCurrentUser(token);
    setUser(profile);
    return profile;
  }, []);

  const logoutUser = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      authView,
      openAuth,
      closeAuth,
      registerUser,
      loginUser,
      logoutUser,
    }),
    [user, isLoading, authView, openAuth, closeAuth, registerUser, loginUser, logoutUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
