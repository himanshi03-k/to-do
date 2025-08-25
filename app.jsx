import React, { useState } from "react";

export default function CreatorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function validate() {
    const errs = { email: "", password: "" } as { email: string; password: string };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) errs.email = "Email is required";
    else if (!emailRegex.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Min 6 characters";
    setErrors(errs);
    return !errs.email && !errs.password;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    // Fake API delay
    await new Promise((r) => setTimeout(r, 700));

    // Demo authentication logic (replace with real API call)
    if (email.toLowerCase() === "creator@example.com" && password === "secret123") {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl shadow-2xl bg-slate-900/60 backdrop-blur border border-slate-700">
          <div className="px-8 pt-8 pb-2 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-indigo-500/20 grid place-items-center">
              <span className="text-xl">⚡</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight">Creator Login</h1>
            <p className="text-sm text-slate-400">Sign in to manage your content</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            <div>
              <label className="block text-sm mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-4 py-3 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                placeholder="creator@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-rose-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-4 py-3 pr-12 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-xl border border-slate-600 hover:border-slate-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 select-none">
                <input type="checkbox" className="accent-indigo-500" />
                Remember me
              </label>
              <a href="#" className="text-indigo-300 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed px-4 py-3 font-semibold"
            >
              {status === "loading" ? "Signing In…" : "Sign in as Creator"}
            </button>

            {status === "error" && (
              <div className="mt-2 text-center text-rose-400 text-sm">
                Invalid credentials. Try <code>creator@example.com</code> / <code>secret123</code> for the demo.
              </div>
            )}
            {status === "success" && (
              <div className="mt-2 text-center text-emerald-400 text-sm">
                Success! Redirecting to the creator dashboard…
              </div>
            )}
          </form>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          By continuing you agree to our <a href="#" className="underline">Terms</a> & <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>

      {/* Minimal styles if Tailwind isn't installed */}
      <style>{`
        /* Fallback styles for environments without Tailwind */
        .no-tailwind & { all: revert; }
      `}</style>
    </div>
  );
}
