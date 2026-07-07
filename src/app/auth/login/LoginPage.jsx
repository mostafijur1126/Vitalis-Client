"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
export const dynamic = "force-dynamic";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const redirectUrl = searchParams.get("redirect") || "/";
    console.log("redirect url: ", redirectUrl);
    const { data, error } = await authClient.signIn.email({
      email, // required
      password, // required
      rememberMe: true,
      callbackURL: redirectUrl, // optional
    });
    if (data) {
      toast.success("Login Successful!");
      router.refresh(); // Refresh the page to update the session state
      router.replace(redirectUrl);
    } else if (error) {
      toast.warning(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const redirectUrl = searchParams.get("redirect") || "/";
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectUrl,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCF9F6] dark:bg-[#1E1C18] px-4 py-12 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-[#2D2A24] rounded-2xl shadow-lg border border-[#E8E0D8] dark:border-[#3A3530] p-8"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#D4845A]">
            VITALIS
          </h1>
          <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] mt-1">
            Elevate your wellness journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-[#6B655A] dark:text-[#B8B0A6]" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3 py-2 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] transition-colors font-['Inter'] text-sm"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-[#6B655A] dark:text-[#B8B0A6]" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full pl-10 pr-10 py-2 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] transition-colors font-['Inter'] text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#D4845A]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="font-['Inter'] text-sm text-[#D4845A] hover:text-[#B86A42] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors shadow-md hover:shadow-lg"
          >
            LOGIN
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-[#E8E0D8] dark:border-[#3A3530]"></div>
          <span className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] px-4">
            OR CONTINUE WITH
          </span>
          <div className="flex-1 border-t border-[#E8E0D8] dark:border-[#3A3530]"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2.5 bg-white dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#F5EDE6] dark:hover:bg-[#4A4540] transition-colors flex items-center justify-center gap-3 shadow-sm"
        >
          <FcGoogle size={20} />
          Google
        </button>

        {/* Register Link */}
        <p className="text-center font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] mt-6">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#D4845A] hover:text-[#B86A42] font-medium transition-colors"
          >
            Register
          </Link>
        </p>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
            © 2024 VITALIS FITNESS. PREMIUM WELLNESS MANAGEMENT.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
