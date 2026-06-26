"use client";

import { motion } from "framer-motion"; // ✅ correct import
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Samantha Read",
    duration: "User for 2 years",
    quote:
      "\"Vitalis changed the way I view fitness. It's not just about sweating; it's about the connection between body and mind. The instructors are world-class.\"",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Thompson",
    duration: "User for 8 months",
    quote:
      '"The variety of classes keeps me motivated. From HIIT to Yoga, there\'s always something new to learn and push myself further. Truly a boutique experience."',
    rating: 5,
  },
  {
    id: 3,
    name: "Samantha Read",
    duration: "User for 2 years",
    quote:
      '"The variety of classes keeps me motivated. From HIIT to Yoga, there\'s always something new to learn and push myself further. Truly a boutique experience."',
    rating: 5,
  },
];

export default function SuccessStories() {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-[#1E1C18] transition-colors duration-300">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Success Stories
          </h2>
          <p className="font-['Inter'] text-lg text-[#6B655A] dark:text-[#B8B0A6] mt-1">
            Real people, real transformations.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#FCF9F6] dark:bg-[#2D2A24] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E8E0D8] dark:border-[#3A3530] flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4 text-[#D4A050]">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-['Inter'] text-sm text-[#2D2A24] dark:text-[#EAE5DE] leading-relaxed flex-1 italic mb-4">
                {testimonial.quote}
              </p>

              {/* Author & Duration */}
              <div className="border-t border-[#E8E0D8] dark:border-[#3A3530] pt-4 mt-auto">
                <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
                  {testimonial.name}
                </p>
                <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                  {testimonial.duration}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
