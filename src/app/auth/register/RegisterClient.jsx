"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaImage,
  FaLock,
  FaCheckCircle,
  FaTimesCircle,
  FaUserTag,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
export const dynamic = "force-dynamic";
const RegisterClient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("Member"); // Default role
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Password validation
  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const registrationData = Object.fromEntries(formData.entries());
    if (!isPasswordValid) return;
    // Send registration data with role to Better Auth
    const { data, error } = await authClient.signUp.email({
      email: registrationData.email, // required
      password: registrationData.password, // required
      name: registrationData.name, // required
      image: registrationData.image, // required
      data: {
        role: registrationData.role || "member",
        plan: "free",
        status: "active",
      },
    });
    if (data) {
      router.push("/");
      toast.success("Registation success!");
    } else if (error) {
      toast.warning(error.message);
    }
    // console.log("Register:", { data, error });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCF9F6] dark:bg-[#1E1C18] px-4 py-12 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-[#2D2A24] rounded-2xl shadow-lg border border-[#E8E0D8] dark:border-[#3A3530] p-8"
      >
        {/* Logo & Heading */}
        <div className="text-center mb-8">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#D4845A]">
            VITALIS
          </h1>
          <h2 className="font-['Inter'] text-xl font-semibold text-[#2D2A24] dark:text-[#EAE5DE] mt-2">
            Create Account
          </h2>
          <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
            Join our premium wellness community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1"
            >
              Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-[#6B655A] dark:text-[#B8B0A6]" />
              </div>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-3 py-2 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] transition-colors font-['Inter'] text-sm"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-[#6B655A] dark:text-[#B8B0A6]" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Vitalis@example.com"
                className="w-full pl-10 pr-3 py-2 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] transition-colors font-['Inter'] text-sm"
                required
              />
            </div>
          </div>

          {/* Profile Image URL */}
          <div>
            <label
              htmlFor="image"
              className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1"
            >
              Profile Image URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaImage className="h-5 w-5 text-[#6B655A] dark:text-[#B8B0A6]" />
              </div>
              <input
                id="image"
                name="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://image-link.com/avatar.jpg"
                className="w-full pl-10 pr-3 py-2 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] transition-colors font-['Inter'] text-sm"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1"
            >
              Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserTag className="h-5 w-5 text-[#6B655A] dark:text-[#B8B0A6]" />
              </div>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] transition-colors font-['Inter'] text-sm appearance-none"
              >
                <option value="member">Member</option>
                <option value="trainer">Trainer</option>
              </select>
              {/* Custom dropdown arrow (optional) */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-[#6B655A] dark:text-[#B8B0A6]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-1 font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
              {role === "Trainer"
                ? "You'll be able to create and manage classes, and post in the forum."
                : "You'll discover classes, book sessions, and engage with the community."}
            </p>
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
                name="password"
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
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#D4845A] text-sm font-['Inter']"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mt-2 space-y-1 font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
              <p className="flex items-center gap-2">
                {password.length > 0 &&
                  (hasMinLength ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaTimesCircle className="text-[#C47A6A]" />
                  ))}
                Minimum 6 characters
              </p>
              <p className="flex items-center gap-2">
                {password.length > 0 &&
                  (hasUpperCase ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaTimesCircle className="text-[#C47A6A]" />
                  ))}
                One uppercase letter
              </p>
              <p className="flex items-center gap-2">
                {password.length > 0 &&
                  (hasLowerCase ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaTimesCircle className="text-[#C47A6A]" />
                  ))}
                One lowercase letter
              </p>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={!isPasswordValid}
            className={`w-full py-2.5 font-['Inter'] font-medium rounded-lg shadow-md hover:shadow-lg transition-all ${
              isPasswordValid
                ? "bg-[#D4845A] text-white hover:bg-[#B86A42]"
                : "bg-[#E8E0D8] text-[#8A847C] cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#D4845A] hover:text-[#B86A42] font-medium transition-colors"
          >
            Login
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

export default RegisterClient;
