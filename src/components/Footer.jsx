"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.includes("dashboard")) {
    return null;
  }
  return (
    <footer className="bg-white dark:bg-[#1E1C18] border-t border-[#E8E0D8] dark:border-[#3A3530] transition-colors duration-300">
      <div className=" mx-auto px-6 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#D4845A] tracking-wide mb-3">
              VITALIS
            </h2>
            <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
              Elevating your wellness journey through professional guidance and
              community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#D4845A] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 font-['Inter'] text-sm">
              <li>
                <Link
                  href="/classes"
                  className="text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] transition-colors"
                >
                  Our Classes
                </Link>
              </li>
              <li>
                <Link
                  href="/trainers"
                  className="text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] transition-colors"
                >
                  Trainer Profiles
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] transition-colors"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] transition-colors"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#D4845A] mb-4">
              Social
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
            <div className="mt-4">
              <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                Email Address
              </p>
            </div>
          </div>

          {/* Email Signup */}
          <div>
            <h3 className="font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#D4845A] mb-4">
              Stay Updated
            </h3>
            <form className="flex flex-col lg:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] transition-colors font-['Inter'] text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#D4845A] text-white rounded-lg hover:bg-[#B86A42] transition-colors font-['Inter'] text-sm font-medium whitespace-nowrap"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#E8E0D8] dark:border-[#3A3530] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
          <p>© 2024 VITALIS Fitness. Premium Wellness Management.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link
              href="/terms"
              className="hover:text-[#D4845A] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[#D4845A] transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
