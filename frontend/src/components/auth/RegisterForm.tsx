"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, Phone, User, X } from "lucide-react";
import GoogleIcon from "./GoogleIcon";
import PasswordStrength from "./PasswordStrength";

const inputClass =
  "w-full rounded-sm bg-cream border border-black/15 pl-10 pr-3.5 py-3 text-[14px] text-ink placeholder:text-stone/70 outline-none focus:ring-2 focus:ring-aurum focus:border-aurum transition-shadow";

export default function RegisterForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const confirmTouched = confirmPassword.length > 0;
  const passwordsMatch = confirmPassword === password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 1200);
  };

  if (done) {
    return (
      <div className="w-full max-w-[400px] mx-auto text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-pill bg-sage text-grove mb-6">
          <CheckCircle2 size={30} strokeWidth={1.6} />
        </span>
        <h1 className="text-[30px] sm:text-[34px]">You&rsquo;re in</h1>
        <p className="text-stone text-[14.5px] mt-3 leading-relaxed">
          Your account has been created. We&rsquo;ve sent a verification link to your email —
          confirm it to start shopping from Azerbaijan&rsquo;s village makers.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-sm bg-nar text-white text-[14.5px] font-semibold px-6 py-3 mt-7 hover:bg-nar-deep transition-colors"
        >
          Continue to By Aurum Girls
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[420px] mx-auto">
      <Link href="/" className="inline-flex lg:hidden items-center gap-2.5 mb-10" aria-label="By Aurum Girls — Home">
        <Image src="/images/logo-color.png" alt="By Aurum Girls" width={32} height={32} className="h-8 w-8" />
        <span className="font-serif text-[17px]">By Aurum Girls</span>
      </Link>

      <span className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-aurum">
        Create account
      </span>
      <h1 className="text-[32px] sm:text-[36px] mt-1.5">Join By Aurum Girls</h1>
      <p className="text-stone text-[14.5px] mt-2">
        Create an account to shop directly from village makers across Azerbaijan.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-[12.5px] font-semibold text-stone mb-1.5">
              First name
            </label>
            <div className="relative">
              <User size={16} strokeWidth={1.8} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                placeholder="Fidan"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-[12.5px] font-semibold text-stone mb-1.5">
              Last name
            </label>
            <div className="relative">
              <User size={16} strokeWidth={1.8} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                placeholder="Xəlilova"
                className={inputClass}
              />
            </div>
          </div>
        </div>

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
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-[12.5px] font-semibold text-stone mb-1.5">
            Phone number
          </label>
          <div className="relative">
            <Phone size={16} strokeWidth={1.8} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+994 50 123 45 67"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-[12.5px] font-semibold text-stone mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock size={16} strokeWidth={1.8} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass + " pr-11"}
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
          <PasswordStrength password={password} />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-[12.5px] font-semibold text-stone mb-1.5">
            Confirm password
          </label>
          <div className="relative">
            <Lock size={16} strokeWidth={1.8} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={
                inputClass +
                ` pr-11 ${confirmTouched ? (passwordsMatch ? "border-olive" : "border-nar") : ""}`
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors"
            >
              {showConfirm ? <EyeOff size={16} strokeWidth={1.8} /> : <Eye size={16} strokeWidth={1.8} />}
            </button>
          </div>
          {confirmTouched && (
            <p
              className={`flex items-center gap-1.5 text-[11.5px] mt-1.5 ${
                passwordsMatch ? "text-olive" : "text-nar"
              }`}
            >
              {passwordsMatch ? (
                <>
                  <Check size={12} strokeWidth={2.4} /> Passwords match
                </>
              ) : (
                <>
                  <X size={12} strokeWidth={2.4} /> Passwords don&rsquo;t match yet
                </>
              )}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting || (confirmTouched && !passwordsMatch)}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-nar text-white text-[15px] font-semibold px-6 py-3.5 shadow-sm hover:bg-nar-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 size={16} strokeWidth={2.2} className="animate-spin" />
              Creating account…
            </>
          ) : (
            "Register"
          )}
        </button>

        <p className="text-[11.5px] text-stone -mt-2 leading-relaxed">
          By creating an account, you agree to our{" "}
          <Link href="/legal/terms" className="underline hover:text-nar">Terms</Link> and{" "}
          <Link href="/legal/privacy" className="underline hover:text-nar">Privacy Policy</Link>.
        </p>

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
          Sign up with Google
        </button>
      </form>

      <p className="text-center text-[13.5px] text-stone mt-8">
        Already have an account?{" "}
        <Link href="/signin" className="font-semibold text-nar hover:text-nar-deep transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
