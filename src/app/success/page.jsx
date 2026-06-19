import { CreateSubscriptions } from "@/lib/actions/subscriptions";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FaCheckCircle,
  FaCalendarCheck,
  FaUser,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    metadata,
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    await CreateSubscriptions({ ...metadata, sessionId: session_id });

    // Extract metadata (assumes you passed these in the checkout session)
    const {
      className = "Fitness Class",
      trainer = "Expert Trainer",
      price = "0",
      duration = "60",
      classId = "",
    } = metadata;

    return (
      <div className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] flex items-center justify-center px-4 py-12 transition-colors duration-300">
        <div className="w-full max-w-2xl bg-white dark:bg-[#2D2A24] rounded-2xl shadow-xl border border-[#E8E0D8] dark:border-[#3A3530] p-8 md:p-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#A68B6E]/20 dark:bg-[#A68B6E]/30 flex items-center justify-center">
              <FaCheckCircle className="w-10 h-10 text-[#A68B6E]" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-center text-[#2D2A24] dark:text-[#EAE5DE]">
            Payment Successful!
          </h1>
          <p className="font-['Inter'] text-center text-[#6B655A] dark:text-[#B8B0A6] mt-2">
            Thank you for your booking. A confirmation email has been sent to{" "}
            <span className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
              {customerEmail}
            </span>
            .
          </p>

          {/* Booking Summary */}
          <div className="mt-8 bg-[#F5EDE6] dark:bg-[#3A3530] rounded-xl p-6 space-y-3 border border-[#E8E0D8] dark:border-[#4A4540]">
            <h2 className="font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#6B655A] dark:text-[#B8B0A6]">
              Booking Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <FaCalendarCheck className="w-5 h-5 text-[#D4845A]" />
                <div>
                  <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                    Class
                  </p>
                  <p className="font-['Inter'] font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                    {className}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaUser className="w-5 h-5 text-[#D4845A]" />
                <div>
                  <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                    Trainer
                  </p>
                  <p className="font-['Inter'] font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                    {trainer}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="w-5 h-5 text-[#D4845A]" />
                <div>
                  <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                    Duration
                  </p>
                  <p className="font-['Inter'] font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                    {duration} minutes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaDollarSign className="w-5 h-5 text-[#D4845A]" />
                <div>
                  <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                    Price
                  </p>
                  <p className="font-['Inter'] font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                    ${price}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard/bookings"
              className="flex-1 text-center py-3 bg-[#D4845A] text-white font-['Inter'] font-semibold rounded-lg hover:bg-[#B86A42] transition-colors shadow-md hover:shadow-lg"
            >
              View My Bookings
            </Link>
            <Link
              href="/classes"
              className="flex-1 text-center py-3 border-2 border-[#D4845A] text-[#D4845A] font-['Inter'] font-semibold rounded-lg hover:bg-[#D4845A] hover:text-white transition-all"
            >
              Browse More Classes
            </Link>
          </div>

          {/* Extra info */}
          <p className="mt-6 text-center font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
            If you have any questions, please email{" "}
            <a
              href="mailto:orders@example.com"
              className="text-[#D4845A] hover:underline"
            >
              orders@example.com
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
}
