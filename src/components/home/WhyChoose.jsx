"use client";

import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaCalendarAlt, FaUsers } from "react-icons/fa";

const features = [
  {
    icon: FaChalkboardTeacher,
    title: "Expert Trainers",
    description:
      "Our certified coaches specialize in high-performance results and holistic body wellness.",
  },
  {
    icon: FaCalendarAlt,
    title: "Flexible Scheduling",
    description:
      "Book classes that fit your lifestyle with our intuitive mobile app and management tools.",
  },
  {
    icon: FaUsers,
    title: "Community Support",
    description:
      "Connect with like-minded individuals in our vibrant forums and local wellness groups.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-[#1E1C18] transition-colors duration-300">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-6xl">
        {" "}
        {/* Custom px-6xl class — or use px-8 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Why Choose <span className="text-[#D4845A]">VITALIS</span>
          </h2>
          <p className="font-['Inter'] text-lg text-[#6B655A] dark:text-[#B8B0A6] mt-2">
            Elevate your fitness journey with our premium features
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F5EDE6] dark:bg-[#2D2A24] rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#E8E0D8] dark:border-[#3A3530]"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[#D4845A]/10 dark:bg-[#D4845A]/20 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-[#D4845A]" />
                </div>
              </div>
              <h3 className="font-['Inter'] text-xl font-semibold text-[#2D2A24] dark:text-[#EAE5DE] mb-2">
                {feature.title}
              </h3>
              <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
