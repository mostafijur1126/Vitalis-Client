"use client";

import { bookClass } from "@/lib/actions/bookClasses";
import { createCheckoutSession } from "@/lib/actions/createCheckout";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaDumbbell,
  FaLevelUpAlt,
  FaLanguage,
  FaInfoCircle,
} from "react-icons/fa";

export default function ClassDetails({
  classData: propClassData,
  isBooked,
  isFavorite: initialFavorite,
  userId,
  userName,
  userEmail,
}) {
  const data = propClassData;

  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [favLoading, setFavLoading] = useState(false);

  // Static data (would come from backend in real app)
  const rating = 4.9;
  const reviews = 124;
  const capacity = 12;
  const booked = 15;
  const equipment = "Dumbbells, Mat, Timer";
  const language = "English";
  const intensity = "High";
  const location = "Vitalis Wellness Center";
  const studio = "Studio A";

  const handleFavoriteToggle = async () => {
    if (!userId) {
      alert("Please login first!");
      return;
    }
    setFavLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            userName,
            userEmail,
            classId: data._id,
            className: data.className,
            classImage: data.classImage,
            category: data.category,
            price: data.price,
            duration: data.duration,
            author: data.author,
          }),
        },
      );
      // console.log("Response status:", res.status);

      const result = await res.json();
      setIsFavorite(result.isFavorite);
      toast.success(result.message);
    } catch (err) {
      console.error("Favorite error:", err);
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className=" max-w-7xl mx-auto">
        {/* Main Image */}
        <div className="relative w-full h-75 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
          <Image
            src={data.classImage}
            alt={data.className}
            fill
            className="w-full h-75 object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Trainer */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-['Inter'] text-xs font-semibold uppercase tracking-wider text-[#D4845A] bg-[#D4845A]/10 dark:bg-[#D4845A]/20 px-3 py-1 rounded-full">
                      {data.category}
                    </span>
                  </div>
                  <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
                    {data.className}
                  </h1>
                  <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
                    by {data.author}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-[#D4A050]">
                  <FaStar className="w-4 h-4 fill-current" />
                  <FaStar className="w-4 h-4 fill-current" />
                  <FaStar className="w-4 h-4 fill-current" />
                  <FaStar className="w-4 h-4 fill-current" />
                  <FaStar className="w-4 h-4 fill-current" />
                </div>
                <span className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                  {rating}
                </span>
                <span className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                  ({reviews} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-['Inter'] text-lg font-semibold text-[#2D2A24] dark:text-[#EAE5DE] mb-2">
                About this Class
              </h2>
              <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
                <div className="flex items-center gap-2 text-[#D4845A] mb-1">
                  <FaLevelUpAlt className="w-4 h-4" />
                </div>
                <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                  Level
                </p>
                <p className="font-['Inter'] text-sm font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
                  {data.difficultyLevel}
                </p>
              </div>

              <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
                <div className="flex items-center gap-2 text-[#D4845A] mb-1">
                  <FaDumbbell className="w-4 h-4" />
                </div>
                <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                  Intensity
                </p>
                <p className="font-['Inter'] text-sm font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
                  {intensity}
                </p>
              </div>

              <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
                <div className="flex items-center gap-2 text-[#D4845A] mb-1">
                  <FaInfoCircle className="w-4 h-4" />
                </div>
                <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                  Equipment
                </p>
                <p className="font-['Inter'] text-sm font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
                  {equipment}
                </p>
              </div>

              <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
                <div className="flex items-center gap-2 text-[#D4845A] mb-1">
                  <FaLanguage className="w-4 h-4" />
                </div>
                <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                  Language
                </p>
                <p className="font-['Inter'] text-sm font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
                  {language}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
              <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                <span className="font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
                  Infused Water
                </span>{" "}
                Complimentary station
              </p>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#2D2A24] rounded-2xl shadow-lg border border-[#E8E0D8] dark:border-[#3A3530] p-6 sticky top-24">
              {/* Price */}
              <div className="mb-4">
                <p className="font-['Playfair_Display'] text-3xl font-bold text-[#D4845A]">
                  ${data.price}
                </p>
                <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                  Single Session
                </p>
              </div>

              {/* Capacity */}
              <div className="flex items-center justify-between py-3 border-t border-[#E8E0D8] dark:border-[#3A3530]">
                <div className="flex items-center gap-2">
                  <FaUsers className="w-4 h-4 text-[#6B655A] dark:text-[#B8B0A6]" />
                  <span className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                    Capacity
                  </span>
                </div>
                <span className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                  {capacity} / {data.slot}
                </span>
              </div>

              {/* Schedule */}
              <div className="py-3 border-t border-[#E8E0D8] dark:border-[#3A3530]">
                <div className="flex items-center gap-2 mb-2">
                  <FaCalendarAlt className="w-4 h-4 text-[#D4845A]" />
                  <span className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                    Schedule
                  </span>
                </div>
                <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] pl-6">
                  {data.classSchedule}
                </p>
                <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] pl-6">
                  {data.time} — {data.time.split(" ")[0]}:
                  {parseInt(data.time.split(":")[0]) + 1}
                  :00 {data.time.split(" ")[1] || "AM"}
                </p>
              </div>

              {/* Duration */}
              <div className="py-3 border-t border-[#E8E0D8] dark:border-[#3A3530]">
                <div className="flex items-center gap-2">
                  <FaClock className="w-4 h-4 text-[#D4845A]" />
                  <span className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                    Duration
                  </span>
                </div>
                <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] pl-6">
                  {data.duration} Minutes
                </p>
              </div>

              {/* Location */}
              <div className="py-3 border-t border-[#E8E0D8] dark:border-[#3A3530]">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-[#D4845A]" />
                  <span className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                    Location
                  </span>
                </div>
                <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] pl-6">
                  {studio}, {location}
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#E8E0D8] dark:border-[#3A3530]">
                <form action={createCheckoutSession}>
                  {/* Hidden fields e class info pathao */}
                  <input type="hidden" name="classId" value={data._id} />
                  <input
                    type="hidden"
                    name="className"
                    value={data.className}
                  />
                  <input type="hidden" name="trainer" value={data.author} />
                  <input type="hidden" name="price" value={data.price} />
                  <input type="hidden" name="duration" value={data.duration} />
                  <input type="hidden" name="image" value={data.classImage} />

                  <button
                    type="submit"
                    disabled={isBooked}
                    className={`w-full py-3 font-['Inter'] font-semibold rounded-lg transition-colors shadow-md
                  ${
                    isBooked
                      ? "bg-gray-400 text-white cursor-not-allowed opacity-60"
                      : "bg-[#D4845A] text-white hover:bg-[#B86A42] hover:shadow-lg"
                  }`}
                  >
                    {isBooked ? "✅ Already Booked" : "Book Now"}
                  </button>
                </form>

                <button
                  onClick={handleFavoriteToggle}
                  disabled={favLoading}
                  className={`w-full py-3 border-2 font-['Inter'] font-semibold rounded-lg transition-all flex items-center justify-center gap-2
                    ${
                      isFavorite
                        ? "border-red-400 bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30"
                        : "border-[#D4845A] text-[#D4845A] hover:bg-[#D4845A] hover:text-white"
                    }
                    ${favLoading ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                >
                  {favLoading ? (
                    <span>Loading...</span>
                  ) : isFavorite ? (
                    <>
                      <FaHeart className="w-4 h-4 text-red-500" />
                      Remove from Favorites
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="w-4 h-4" />
                      Add to Favorites
                    </>
                  )}
                </button>
              </div>

              {/* Cancellation Policy */}
              <p className="mt-4 font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6] text-center">
                Free cancellation up to 12 hours before class.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
