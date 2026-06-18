"use client";

import { ArrowLeft, Loader2, Music2 } from "lucide-react";

import { AuthFeedback } from "@/features/auth/components/auth-feedback";
import {
  minimumPasswordLength,
  type AuthMode,
  useAuthForm,
} from "@/features/auth/hooks/use-auth-form";
import { AppHeader } from "@/shared/components/layout/app-header";
import { AppMain } from "@/shared/components/layout/app-main";
import { AppShell } from "@/shared/components/layout/app-shell";
import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

type AuthFormProps = {
  initialMode?: AuthMode;
  initialError?: string | null;
  next?: string;
};

export const AuthForm = ({
  initialError,
  initialMode = "signin",
  next = "/logbook",
}: AuthFormProps) => {
  const authForm = useAuthForm({ initialError, initialMode, next });
  const {
    confirmPassword,
    displayName,
    email,
    error,
    handleSubmit,
    isSignup,
    message,
    password,
    pending,
    setConfirmPassword,
    setDisplayName,
    setEmail,
    setPassword,
    switchMode,
  } = authForm;

  return (
    <AppShell>
      <AppHeader
        leading={
          <ButtonLink href="/" size="sm" variant="ghost">
            <ArrowLeft className="h-4 w-4" />
            Back
          </ButtonLink>
        }
      />

      <AppMain className="flex flex-1 items-center justify-center pb-12">
        <div className="w-full max-w-md">
          <Card className="p-8" gradient tone="primary">
            <div className="relative">
              <h1 className="font-display text-glow-primary mb-6 text-2xl">
                {isSignup ? "CREATE ACCOUNT" : "SIGN IN"}
              </h1>
              <p className="text-muted-foreground -mt-4 mb-6 text-sm leading-6">
                {isSignup
                  ? "Create your private live music archive."
                  : "Log in to continue your concert journal."}
              </p>

              {error ? <AuthFeedback tone="error">{error}</AuthFeedback> : null}
              {message ? (
                <AuthFeedback tone="success">{message}</AuthFeedback>
              ) : null}

              <form className="space-y-4" onSubmit={handleSubmit}>
                {isSignup ? (
                  <div className="space-y-1.5">
                    <Label
                      className="text-secondary font-mono text-[10px] tracking-wider uppercase"
                      htmlFor="displayName"
                      required
                    >
                      Name
                    </Label>
                    <Input
                      autoComplete="name"
                      autoFocus={isSignup}
                      disabled={pending}
                      id="displayName"
                      maxLength={80}
                      onChange={(event) => setDisplayName(event.target.value)}
                      placeholder="Your name"
                      required
                      type="text"
                      value={displayName}
                    />
                  </div>
                ) : null}

                <div className="space-y-1.5">
                  <Label
                    className="text-secondary font-mono text-[10px] tracking-wider uppercase"
                    htmlFor="email"
                    required
                  >
                    Email
                  </Label>
                  <Input
                    autoComplete="email"
                    autoFocus={!isSignup}
                    disabled={pending}
                    id="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@echoes.local"
                    required
                    type="email"
                    value={email}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    className="text-secondary font-mono text-[10px] tracking-wider uppercase"
                    htmlFor="password"
                    required
                  >
                    Password
                  </Label>
                  <Input
                    autoComplete={
                      isSignup ? "new-password" : "current-password"
                    }
                    disabled={pending}
                    id="password"
                    minLength={minimumPasswordLength}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    type="password"
                    value={password}
                  />
                </div>

                {isSignup ? (
                  <div className="space-y-1.5">
                    <Label
                      className="text-secondary font-mono text-[10px] tracking-wider uppercase"
                      htmlFor="confirmPassword"
                      required
                    >
                      Confirm password
                    </Label>
                    <Input
                      autoComplete="new-password"
                      disabled={pending}
                      id="confirmPassword"
                      minLength={minimumPasswordLength}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Confirm your password"
                      required
                      type="password"
                      value={confirmPassword}
                    />
                  </div>
                ) : null}

                <Button
                  className="w-full"
                  disabled={pending}
                  size="lg"
                  type="submit"
                >
                  {pending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  {isSignup ? "Create account" : "Log in"}
                </Button>
              </form>

              <div className="text-foreground my-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase">
                <div className="bg-border h-px flex-1" />
                <span>or</span>
                <div className="bg-border h-px flex-1" />
              </div>

              <form action="/api/auth/demo" method="post">
                <input name="next" type="hidden" value={next} />
                <Button
                  className="w-full"
                  disabled={pending}
                  size="lg"
                  type="submit"
                  variant="outline"
                >
                  <Music2 className="h-4 w-4" />
                  Continue with demo account
                </Button>
              </form>

              <div className="text-muted-foreground mt-4 text-center font-mono text-xs">
                {isSignup ? "Already have an account?" : "No account yet?"}{" "}
                <button
                  className="text-secondary underline-offset-4 hover:underline"
                  onClick={() => switchMode(isSignup ? "signin" : "signup")}
                  type="button"
                >
                  {isSignup ? "Sign in" : "Sign up"}
                </button>
              </div>
            </div>
          </Card>
        </div>
      </AppMain>
    </AppShell>
  );
};
