"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaAward,
  FaShieldAlt,
  FaUsers,
  FaCalendarAlt,
  FaTag,
  FaFileAlt,
  FaPaperPlane,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

const specialties = [
  "Select a specialty",
  "Yoga",
  "Weights",
  "Cardio",
  "Pilates",
  "HIIT",
  "Stretching",
  "CrossFit",
  "Zumba",
  "Meditation",
  "Nutrition",
  "Strength Training",
  "Functional Fitness",
  "Dance Fitness",
  "Bootcamp",
  "Other",
];

export default function ApplyTrainerPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [applicationStatus, setApplicationStatus] = useState(null); // null | "pending" | "approved" | "rejected"
  const [checkLoading, setCheckLoading] = useState(true);

  const [formData, setFormData] = useState({
    experience: "",
    specialty: "",
    bio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    const checkApplication = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/trainer-application/check?userId=${user.id}`,
        );
        const data = await res.json();
        if (data.hasApplied) {
          setApplicationStatus(data.status);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCheckLoading(false);
      }
    };
    checkApplication();
  }, [user]);

  const isFormValid =
    formData.experience.trim() !== "" &&
    formData.specialty !== "" &&
    formData.specialty !== "Select a specialty" &&
    formData.bio.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/trainer-application`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id,
            userName: user?.name,
            userEmail: user?.email,
            experience: parseInt(formData.experience),
            specialty: formData.specialty,
            bio: formData.bio,
            status: "pending",
            appliedAt: new Date().toISOString(),
          }),
        },
      );

      const data = await res.json();

      if (data.acknowledged) {
        toast.success("Application submitted successfully!");
        setApplicationStatus("pending"); // ⭐ UI update
        setFormData({ experience: "", specialty: "", bio: "" });
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to submit application!");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading
  if (checkLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-[#D4845A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (applicationStatus) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-4 sm:px-0"
      >
        <div className="bg-white dark:bg-[#2D2A24] rounded-2xl shadow-lg border border-[#E8E0D8] dark:border-[#3A3530] p-8 md:p-12 text-center">
          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            {applicationStatus === "pending" && (
              <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                <FaClock className="w-10 h-10 text-yellow-500" />
              </div>
            )}
            {applicationStatus === "approved" && (
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <FaCheckCircle className="w-10 h-10 text-green-500" />
              </div>
            )}
            {applicationStatus === "rejected" && (
              <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <FaAward className="w-10 h-10 text-red-500" />
              </div>
            )}
          </div>

          {/* Status Text */}
          {applicationStatus === "pending" && (
            <>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
                Application Submitted!
              </h2>
              <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-3">
                Your trainer application is under review. We'll notify you once
                it's been processed.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
                <FaClock className="w-4 h-4 text-yellow-500" />
                <span className="font-['Inter'] text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                  Status: Pending Review
                </span>
              </div>
            </>
          )}

          {applicationStatus === "approved" && (
            <>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
                Congratulations! 🎉
              </h2>
              <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-3">
                Your application has been approved! You are now a certified
                VITALIS trainer.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                <FaCheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-['Inter'] text-sm font-semibold text-green-600 dark:text-green-400">
                  Status: Approved ✅
                </span>
              </div>
            </>
          )}

          {applicationStatus === "rejected" && (
            <>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
                Application Not Approved
              </h2>
              <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-3">
                Unfortunately your application was not approved this time.
                Please try again later.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 rounded-full">
                <span className="font-['Inter'] text-sm font-semibold text-red-600 dark:text-red-400">
                  Status: Rejected ❌
                </span>
              </div>
            </>
          )}

          <div className="mt-8">
            <Link
              href="/dashboard/user"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#D4845A] text-white font-['Inter'] font-semibold rounded-lg hover:bg-[#B86A42] transition-colors shadow-md"
            >
              Go to Overview
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto space-y-8 px-4 sm:px-0"
    >
      {/* Header */}
      <div>
        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
          Apply as Trainer
        </h1>
        <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-2 max-w-2xl">
          Join our elite team of fitness professionals and share your expertise
          with our community.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: FaShieldAlt,
            title: "VITALIS Certified",
            desc: "Global exposure & premium facilities.",
          },
          {
            icon: FaAward,
            title: "Professional Quality",
            desc: "Empower our community",
          },
          {
            icon: FaUsers,
            title: "Community Impact",
            desc: "Inspire & transform lives",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] flex items-center gap-3"
          >
            <div className="p-2 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-lg">
              <card.icon className="w-5 h-5 text-[#D4845A]" />
            </div>
            <div>
              <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] text-sm">
                {card.title}
              </p>
              <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-[#2D2A24] rounded-2xl shadow-lg border border-[#E8E0D8] dark:border-[#3A3530] p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experience */}
          <div>
            <label
              htmlFor="experience"
              className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2"
            >
              <FaCalendarAlt className="text-[#D4845A] w-4 h-4" />
              Years of Experience <span className="text-[#C47A6A]">*</span>
            </label>
            <input
              id="experience"
              name="experience"
              type="number"
              min="0"
              step="0.5"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g. 5"
              className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 font-['Inter'] text-sm"
              required
            />
          </div>

          {/* Specialty */}
          <div>
            <label
              htmlFor="specialty"
              className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2"
            >
              <FaTag className="text-[#D4845A] w-4 h-4" />
              Primary Specialty <span className="text-[#C47A6A]">*</span>
            </label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 font-['Inter'] text-sm appearance-none"
              required
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2"
            >
              <FaFileAlt className="text-[#D4845A] w-4 h-4" />
              Professional Bio <span className="text-[#C47A6A]">*</span>
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="5"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about your fitness journey, philosophy, and previous experience..."
              className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 font-['Inter'] text-sm resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3 font-['Inter'] font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 ${
              isFormValid && !isSubmitting
                ? "bg-[#D4845A] text-white hover:bg-[#B86A42]"
                : "bg-[#E8E0D8] dark:bg-[#3A3530] text-[#8A847C] cursor-not-allowed"
            }`}
          >
            <FaPaperPlane className="w-4 h-4" />
            {isSubmitting ? "Submitting..." : "SUBMIT APPLICATION"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
