"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { GoogleIcon } from "~/components/icons";
import { Input } from "~/components/ui/input";
import { Field, FieldLabel } from "~/components/ui/field";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const [isPending, startTransition] = useTransition();

  const handleSendEmail = (email: string) =>
    startTransition(async () => {
      await signIn("nodemailer", {
        email,
        callbackUrl: "/",
        redirect: false,
      });
      setEmailSent(true);
    });

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      return;
    }

    handleSendEmail(email);

    // await signIn("nodemailer", { email, callbackUrl: "/", redirect: false });
    // setEmailSent(true);
  };

  return (
    <div className="bg-background border-border w-full max-w-xl rounded-3xl border p-10 shadow-2xl">
      <h1 className="text-center text-4xl font-semibold">Sign in</h1>
      <p className="text-muted-foreground mt-4 text-center">
        Choose one of the options below to sign in.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            className="h-10 max-w-100 rounded-full"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <GoogleIcon className="mr-2" />
            <span>Sign in with Google</span>
          </Button>
        </div>

        <div className="border-border text-muted-foreground relative w-full border-t py-4 text-center text-sm">
          <span className="bg-background px-3">or</span>
        </div>

        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="py-6"
              disabled={isPending}
              required
            />
          </Field>
          <Button type="submit" className="py-6" disabled={isPending}>
            {isPending ? "Sending..." : "Sign in with email"}
          </Button>
        </form>

        {emailSent && (
          <div className="border-border/20 bg-muted/10 text-foreground rounded-2xl border p-4 text-center text-sm">
            Check your inbox for a sign-in link.
          </div>
        )}
      </div>
    </div>
  );
}
