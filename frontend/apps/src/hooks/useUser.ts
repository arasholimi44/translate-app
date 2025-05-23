"use client";

import { useApp } from "@/components";
import { ILoginFormData, IRegisterFormData } from "@/lib";
import { getSession, signIn, signOut } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export const useUSer = () => {
  const [busy, setBusy] = useState<boolean>(false);
  const { user, setUser, setError, resetError } = useApp();

  const getUser = useCallback(async () => {
    try {
      const currUser = await getSession();
      setUser(currUser?.user ?? null);
    } catch {
      setUser(null);
    }
  }, [setUser]);

  useEffect(() => {
    async function fetchUser() {
      setBusy(true);
      await getUser();
      setBusy(false);
    }

    fetchUser();
  }, [getUser]);

  const login = useCallback(
    async ({ email, password }: ILoginFormData) => {
      try {
        setBusy(true);
        resetError();

        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (!result?.ok) {
          throw new Error(result?.error || "Login failed");
        }

        await getUser();
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message || "Login failed");
        } else {
          setError("Login failed");
        }
      } finally {
        setBusy(false);
      }
    },
    [getUser, setError, resetError]
  );

  const logout = useCallback(async () => {
    try {
      setBusy(true);
      resetError();
      await signOut({ redirect: false });
      setUser(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Logout failed");
      } else {
        setError("Logout failed");
      }
    } finally {
      setBusy(false);
    }
  }, [resetError, setError]);

  const register = async ({
    email,
    password,
    password2,
  }: IRegisterFormData) => {
    setBusy(true);
    resetError();

    try {
      if (password !== password2) {
        throw new Error("Passwords don't match");
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || "Registration failed");
      }

      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Registration failed");
      } else {
        setError("Registration failed");
      }
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    user,
    login,
    logout,
    register,
    setUser,
  };
};
