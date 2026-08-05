import type { Metadata } from "next";
import AuthVisualPanel from "@/components/auth/AuthVisualPanel";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — By Aurum Girls",
  description: "Sign in to your By Aurum Girls account to track orders and message makers.",
};

export default function SignInPage() {
  return (
    <div className="flex-1 flex min-h-screen">
      <AuthVisualPanel />
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-16 bg-linen">
        <LoginForm />
      </div>
    </div>
  );
}
