"use client";

import { useState } from "react";
import { FaSearch, FaBell, FaUserCircle, FaBars } from "react-icons/fa";

export default function DashboardNavbar({ user, onMenuToggle }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#2D2A24] border-b border-[#E8E0D8] dark:border-[#3A3530] px-4 py-3 transition-colors duration-300">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile menu toggle + Search */}
        <div className="flex items-center gap-3 flex-1">
          {/* Hamburger – visible on mobile only */}
          <button
            onClick={onMenuToggle}
            className="md:hidden text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] transition-colors"
            aria-label="Toggle sidebar"
          >
            <FaBars size={22} />
          </button>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-[#6B655A] dark:text-[#B8B0A6]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members, transactions, or trainers..."
              className="w-full pl-9 pr-4 py-2 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm"
            />
          </div>
        </div>

        {/* Right: Notification + User Profile */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Notification Bell */}
          <button
            className="relative text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#D4845A] transition-colors"
            aria-label="Notifications"
          >
            <FaBell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#C47A6A] rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#D4845A]"
              />
            ) : (
              <FaUserCircle className="w-9 h-9 text-[#D4845A]" />
            )}
            <div className="hidden sm:block">
              <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] text-sm leading-tight">
                {user?.name || "User"}
              </p>
              <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                {user?.role || "Member"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
