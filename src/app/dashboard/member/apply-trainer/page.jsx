"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaAward,
  FaShieldAlt,
  FaUsers,
  FaCalendarAlt,
  FaTag,
  FaFileAlt,
  FaLink,
  FaPaperPlane,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { TrainerApplication } from "@/lib/actions/addClasses";
import toast from "react-hot-toast";

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

  const [formData, setFormData] = useState({
    experience: "",
    specialty: "",
    bio: "",
    certificationUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // "pending" | "success" | "error"

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
    setSubmitStatus(null);

    // Prepare data for API
    const applicationData = {
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      experience: parseInt(formData.experience),
      specialty: formData.specialty,
      bio: formData.bio,
      status: "pending", // Default status
      appliedAt: new Date().toISOString(),
    };

    try {
      const result = await TrainerApplication(applicationData);
      if (result.acknowledged === true) {
        toast.success("Application Submited successful!");
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus("success");
      setFormData({ experience: "", specialty: "", bio: "" });
    } catch (error) {
      toast.error(error);
      console.error("Error submitting application:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          with our community. We look for passionate individuals dedicated to
          physical excellence and wellness.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] flex items-center gap-3">
          <div className="p-2 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-lg">
            <FaShieldAlt className="w-5 h-5 text-[#D4845A]" />
          </div>
          <div>
            <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] text-sm">
              VITALIS Certified
            </p>
            <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
              Global exposure & premium facilities.
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] flex items-center gap-3">
          <div className="p-2 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-lg">
            <FaAward className="w-5 h-5 text-[#D4845A]" />
          </div>
          <div>
            <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] text-sm">
              Professional Quality
            </p>
            <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
              Empower our community
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] flex items-center gap-3">
          <div className="p-2 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-lg">
            <FaUsers className="w-5 h-5 text-[#D4845A]" />
          </div>
          <div>
            <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] text-sm">
              Community Impact
            </p>
            <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
              Inspire & transform lives
            </p>
          </div>
        </div>
      </div>

      {/* Application Form */}
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
              className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm"
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
              className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm appearance-none"
              required
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Professional Bio */}
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
              className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm resize-none"
              required
            />
          </div>

          {/* Submit Status */}
          {submitStatus === "success" && (
            <div className="p-4 bg-[#A68B6E]/10 dark:bg-[#A68B6E]/20 border border-[#A68B6E] rounded-lg">
              <p className="font-['Inter'] text-sm text-[#A68B6E]">
                ✅ Application submitted successfully! Your status is now
                "Pending". You'll receive a notification once reviewed.
              </p>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="p-4 bg-[#C47A6A]/10 dark:bg-[#C47A6A]/20 border border-[#C47A6A] rounded-lg">
              <p className="font-['Inter'] text-sm text-[#C47A6A]">
                ❌ There was an error submitting your application. Please try
                again.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3 font-['Inter'] font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
              isFormValid && !isSubmitting
                ? "bg-[#D4845A] text-white hover:bg-[#B86A42]"
                : "bg-[#E8E0D8] dark:bg-[#3A3530] text-[#8A847C] dark:text-[#6B655A] cursor-not-allowed"
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
