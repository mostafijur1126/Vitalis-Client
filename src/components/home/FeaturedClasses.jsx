import Link from "next/link";
import Image from "next/image";
// import { motion } from "framer-motion";
import { FaUser, FaClock, FaUsers, FaTag, FaDollarSign } from "react-icons/fa";
import { getFeaturedClass } from "@/lib/api/allClass";

export default async function FeaturedClasses() {
  const classes = await getFeaturedClass();

  // If no data, return nothing or a fallback
  if (!classes || classes.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 bg-[#FCF9F6] dark:bg-[#1E1C18] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Featured Classes
            {classes.length}
          </h2>
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-2">
            Handpicked top‑rated sessions to elevate your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="bg-white dark:bg-[#2D2A24] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8E0D8] dark:border-[#3A3530] group"
            >
              {/* Class Image */}
              {cls.classImage ? (
                <div className="relative h-48 w-full bg-[#F5EDE6] dark:bg-[#3A3530] overflow-hidden">
                  <Image
                    src={cls.classImage}
                    alt={cls.className}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-[#F5EDE6] dark:bg-[#3A3530] flex items-center justify-center text-[#6B655A] dark:text-[#B8B0A6]">
                  <span className="font-['Inter'] text-sm">No image</span>
                </div>
              )}

              <div className="p-5">
                {/* Class Name */}
                <h3 className="font-['Inter'] font-semibold text-lg text-[#2D2A24] dark:text-[#EAE5DE] leading-tight">
                  {cls.className}
                </h3>

                {/* Trainer Name */}
                <div className="flex items-center gap-1.5 mt-1 text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                  <FaUser className="w-3.5 h-3.5 text-[#D4845A]" />
                  <span>{cls.authorName || "Unknown Trainer"}</span>
                </div>

                {/* Category & Price/Duration */}
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-full text-[#D4845A] font-medium">
                    <FaTag className="w-3 h-3" />
                    {cls.category || "General"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#2D2A24] dark:text-[#EAE5DE]">
                    <FaDollarSign className="w-3 h-3 text-[#D4845A]" />
                    {cls.price}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#6B655A] dark:text-[#B8B0A6]">
                    <FaClock className="w-3 h-3 text-[#D4845A]" />
                    {cls.duration} min
                  </span>
                </div>

                {/* Booking Count */}
                <div className="mt-3 flex items-center gap-1.5 text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                  <FaUsers className="w-4 h-4 text-[#D4845A]" />
                  <span>{cls.totalBookings || 0} bookings</span>
                </div>

                {/* Details Button */}
                <Link
                  href={`/all-classes/${cls._id}`}
                  className="mt-4 block w-full text-center py-2.5 px-4 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors shadow-sm hover:shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Optional "View All" link */}
        <div className="text-center mt-10">
          <Link
            href="/all-classes"
            className="font-['Inter'] text-[#D4845A] hover:text-[#B86A42] transition-colors font-medium inline-flex items-center gap-1"
          >
            Explore all classes →
          </Link>
        </div>
      </div>
    </section>
  );
}
