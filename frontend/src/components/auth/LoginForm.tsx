"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import GoogleIcon from "./GoogleIcon";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      router.push("/");
    }, 1100);
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      <Link href="/" className="inline-flex lg:hidden items-center gap-2.5 mb-10" aria-label="By Aurum Girls — Home">
        <Image src="/images/logo-color.png" alt="By Aurum Girls" width={32} height={32} className="h-8 w-8" />
        <span className="font-serif text-[17px]">By Aurum Girls</span>
      </Link>

      <span className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-aurum">
        Sign in
      </span>
      <h1 className="text-[32px] sm:text-[36px] mt-1.5">Welcome back</h1>
      <p className="text-stone text-[14.5px] mt-2">
        Sign in to track orders, message makers, and pick up where you left off.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
        <div>
          <label htmlFor="email" className="block text-[12.5px] font-semibold text-stone mb-1.5">
            Email address
          </label>
          <div className="relative">
            <Mail size={16} strokeWidth={1.8} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-sm bg-cream border border-black/15 pl-10 pr-3.5 py-3 text-[14px] text-ink placeholder:text-stone/70 outline-none focus:ring-2 focus:ring-aurum focus:border-aurum transition-shadow"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-[12.5px] font-semibold text-stone">
              Password
            </label>
            <Link href="/forgot-password" className="text-[12.5px] font-semibold text-nar hover:text-nar-deep transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock size={16} strokeWidth={1.8} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-sm bg-cream border border-black/15 pl-10 pr-11 py-3 text-[14px] text-ink placeholder:text-stone/70 outline-none focus:ring-2 focus:ring-aurum focus:border-aurum transition-shadow"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors"
            >
              {showPassword ? <EyeOff size={16} strokeWidth={1.8} /> : <Eye size={16} strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded-xs accent-[#A83A2B] cursor-pointer"
          />
          <span className="text-[13.5px] text-ink">Remember me</span>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-nar text-white text-[15px] font-semibold px-6 py-3.5 shadow-sm hover:bg-nar-deep transition-colors disabled:opacity-70 disabled:cursor-wait"
        >
          {submitting ? (
            <>
              <Loader2 size={16} strokeWidth={2.2} className="animate-spin" />
              Signing in…
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="flex items-center gap-3 my-1">
          <span className="h-px flex-1 bg-black/10" />
          <span className="text-[12px] text-stone">or</span>
          <span className="h-px flex-1 bg-black/10" />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-black/15 bg-cream text-ink text-[14px] font-semibold px-6 py-3 hover:bg-sand transition-colors"
        >
          <GoogleIcon size={17} />
          Continue with Google
        </button>
      </form>

      <p className="text-center text-[13.5px] text-stone mt-8">
        New to By Aurum Girls?{" "}
        <Link href="/signup/buyer" className="font-semibold text-nar hover:text-nar-deep transition-colors">
          Create an account
        </Link>
      </p>
    </div>
  );
}
