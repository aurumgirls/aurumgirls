import type { Metadata } from "next";
import AuthVisualPanel from "@/components/auth/AuthVisualPanel";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create an Account — By Aurum Girls",
  description: "Register a By Aurum Girls account to shop directly from village makers across Azerbaijan.",
};

export default function RegisterPage() {
  return (
    <div className="flex-1 flex min-h-screen">
      <AuthVisualPanel />
      <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-16 bg-linen">
        <RegisterForm />
      </div>
    </div>
  );
}
