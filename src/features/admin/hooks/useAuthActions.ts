import React from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout, setTab } from "../../../store";

export function useAuthActions() {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpName, setSignUpName] = React.useState("");
  const [signUpPassword, setSignUpPassword] = React.useState("");
  const [signUpSuccess, setSignUpSuccess] = React.useState(false);
  const [signUpError, setSignUpError] = React.useState<string | null>(null);

  const handleLogin = React.useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      dispatch(loginSuccess({ token: data.token, user: data.user }));
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      setLoginError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoginLoading(false);
    }
  }, [dispatch, email, password]);

  const handleSignUp = React.useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setSignUpError(null);
    setSignUpSuccess(false);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signUpEmail, name: signUpName, password: signUpPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSignUpSuccess(true);
      setEmail(signUpEmail);
      setSignUpEmail("");
      setSignUpName("");
      setSignUpPassword("");
      setTimeout(() => setIsSignUp(false), 2000);
    } catch (error: unknown) {
      setSignUpError(error instanceof Error ? error.message : "Registration failed");
    }
  }, [dispatch, signUpEmail, signUpName, signUpPassword]);

  const handleLogout = React.useCallback(() => {
    dispatch(logout());
    dispatch(setTab("HOME"));
  }, [dispatch]);

  return {
    email,
    password,
    loginLoading,
    loginError,
    isSignUp,
    signUpEmail,
    signUpName,
    signUpPassword,
    signUpSuccess,
    signUpError,
    setEmail,
    setPassword,
    setIsSignUp,
    setSignUpEmail,
    setSignUpName,
    setSignUpPassword,
    handleLogin,
    handleSignUp,
    handleLogout,
  };
}
