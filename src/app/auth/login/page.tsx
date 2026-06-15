"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      return;
    }

    await signIn("nodemailer", { email, callbackUrl: "/" });
    setEmailSent(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/90 p-10 shadow-2xl shadow-black/30">
        <h1 className="text-center text-4xl font-semibold">Sign in</h1>
        <p className="mt-4 text-center text-slate-300">
          Choose one of the options below to sign in.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full rounded-2xl bg-white px-5 py-4 text-slate-950 transition hover:bg-slate-100"
          >
            Continue with Google
          </button>

          <div className="relative w-full border-t border-slate-700 py-4 text-center text-sm text-slate-500">
            <span className="bg-slate-900 px-3">or</span>
          </div>

          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <label
              className="text-sm font-medium text-slate-200"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white transition outline-none focus:border-slate-400"
              required
            />
            <button
              type="submit"
              className="rounded-2xl bg-slate-700 px-5 py-4 text-white transition hover:bg-slate-600"
            >
              Sign in with email
            </button>
          </form>

          {emailSent && (
            <div className="rounded-2xl border border-emerald-600/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
              Check your inbox for a sign-in link.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
