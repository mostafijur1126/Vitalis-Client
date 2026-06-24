"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaImage,
  FaTimes,
  FaDumbbell,
  FaClock,
  FaCalendarAlt,
  FaTag,
  FaDollarSign,
  FaUsers,
  FaFileAlt,
  FaLevelUpAlt,
} from "react-icons/fa";
import { div } from "framer-motion/client";
import Image from "next/image";
import { imageUpload } from "@/lib/imgUpload";
import { authClient } from "@/lib/auth-client";
import { CreateClasses } from "@/lib/actions/addClasses";
import toast from "react-hot-toast";

export default function AddClassPage() {
  // Form state
  const [className, setClassName] = useState("");
  const [classImage, setClassImage] = useState("");
  const [category, setCategory] = useState("HIIT");
  const [difficultyLevel, setDifficultyLevel] = useState("Advanced");
  const [duration, setDuration] = useState(45);
  const [price, setPrice] = useState(30);
  const [slot, setSlot] = useState(20);
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("08:00");
  const [selectedDays, setSelectedDays] = useState([]);

  const [uploading, setUploading] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleImageRemove = () => setClassImage("");

  const resetForm = () => {
    (setClassName(""),
      setClassImage(""),
      setCategory("HIIT"),
      setDifficultyLevel("Advanced"));
    setDuration(45);
    setPrice(30);
    setSlot(20);
    setDescription("");
    setTime("08:00");
    setSelectedDays([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: token } = await authClient.token();

    if (!token) {
      toast.error("Authentication failed. Please login again.");
      return;
    }
    const formData = {
      className,
      classImage,
      category,
      difficultyLevel,
      duration,
      price,
      slot,
      description,
      classSchedule: selectedDays.join(", "),
      time: time + " AM",
      author: user.role,
      authorId: user.id,
      authorName: user.name,
      authorImage: user.image,
      autorEmail: user.email,
      status: "panding",
    };
    try {
      const addClass = await CreateClasses(formData, token.token);
      if (addClass.insertedId) {
        toast.success("Class added successfully!");
        resetForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("Faild to add class");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#2D2A24] h-full  p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Trainer Dashboard
          </h1>
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6]">
            Welcome back, Trainer!
          </p>
          <h2 className="font-['Inter'] text-xl font-semibold text-[#2D2A24] dark:text-[#EAE5DE] mt-4">
            Add New Class
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-5">
              {/* Class Name */}
              <div>
                <label
                  htmlFor="className"
                  className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2"
                >
                  <FaDumbbell className="text-[#D4845A] w-4 h-4" />
                  CLASS NAME
                </label>
                <input
                  id="className"
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Fitness Class"
                  className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm"
                />
              </div>

              {/* Class Image */}
              <div>
                <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                  <FaImage className="text-[#D4845A] w-4 h-4" />
                  CLASS IMAGE
                </label>
                {uploading ? (
                  <div className="w-full h-48 flex items-center justify-center border rounded-lg">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-[#D4845A]" />
                  </div>
                ) : classImage ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                    <Image
                      width={500}
                      height={500}
                      src={classImage}
                      alt="Class preview"
                      unoptimized
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={handleImageRemove}
                      className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-full h-48 bg-[#F5EDE6] dark:bg-[#3A3530] border-2 border-dashed border-[#E8E0D8] dark:border-[#4A4540] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#D4845A] transition-colors">
                      <FaImage className="w-8 h-8 text-[#6B655A] dark:text-[#B8B0A6] mb-2" />
                      <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                        Click to upload or drag & drop
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        // console.log(file);
                        if (!file) return;
                        try {
                          setUploading(true);
                          const image = await imageUpload(file);
                          //   console.log("uploaded image:", image.url);
                          setClassImage(image.url);
                        } catch (error) {
                          console.error(error);
                        } finally {
                          setUploading(false);
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2"
                >
                  <FaTag className="text-[#D4845A] w-4 h-4" />
                  CATEGORY
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm appearance-none"
                >
                  <option value="Yoga">Yoga</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Weights">Weights</option>
                  <option value="Pilates">Pilates</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Stretching">Stretching</option>
                </select>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Duration */}
              <div>
                <label
                  htmlFor="duration"
                  className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2"
                >
                  <FaClock className="text-[#D4845A] w-4 h-4" />
                  DURATION
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="duration"
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                    className="w-24 px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm"
                  />
                  <span className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                    mins
                  </span>
                </div>
              </div>

              {/* Class Schedule Days */}
              <div>
                <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2">
                  <FaCalendarAlt className="text-[#D4845A] w-4 h-4" />
                  CLASS SCHEDULE DAYS
                </label>
                <div className="flex flex-wrap gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-md font-['Inter'] text-sm font-medium transition-all ${
                        selectedDays.includes(day)
                          ? "bg-[#D4845A] text-white shadow-sm"
                          : "bg-[#F5EDE6] dark:bg-[#3A3530] text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#E8E0D8] dark:hover:bg-[#4A4540]"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div>
                <label
                  htmlFor="time"
                  className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2"
                >
                  <FaClock className="text-[#D4845A] w-4 h-4" />
                  TIME
                </label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Full-width fields */}
          <div className="grid grid-cols-1 gap-5">
            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2"
              >
                <FaFileAlt className="text-[#D4845A] w-4 h-4" />
                DESCRIPTION
              </label>
              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the class ..."
                className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm resize-none"
              />
            </div>

            {/* Difficulty, Price, Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="difficultyLevel"
                  className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2"
                >
                  <FaLevelUpAlt className="text-[#D4845A] w-4 h-4" />
                  DIFFICULTY LEVEL
                </label>
                <select
                  id="difficultyLevel"
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm appearance-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2"
                >
                  <FaDollarSign className="text-[#D4845A] w-4 h-4" />
                  PRICE ($)
                </label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="slot"
                  className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1 flex items-center gap-2"
                >
                  <FaUsers className="text-[#D4845A] w-4 h-4" />
                  SLOT (capacity)
                </label>
                <input
                  id="slot"
                  type="number"
                  min="1"
                  value={slot}
                  onChange={(e) => setSlot(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-[#D4845A] text-white font-['Inter'] font-semibold rounded-lg hover:bg-[#B86A42] transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Add Class
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
