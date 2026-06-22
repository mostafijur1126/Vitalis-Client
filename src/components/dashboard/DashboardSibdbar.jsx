"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FaHome,
  FaBook,
  FaHeart,
  FaUserGraduate,
  FaSignOutAlt,
  FaTimes,
  FaChalkboardTeacher,
  FaPlusCircle,
  FaComments,
  FaTools,
  FaChartLine,
  FaIdCard,
  FaBuilding,
  FaCog,
  FaUsers,
} from "react-icons/fa";
import { LuGalleryHorizontalEnd } from "react-icons/lu";

const navItemsByRole = {
  member: [
    { name: "Overview", icon: FaHome, href: "/dashboard/member" },
    { name: "Bookings", icon: FaBook, href: "/dashboard/member/bookings" },
    { name: "Favorites", icon: FaHeart, href: "/dashboard/member/favorites" },
    {
      name: "Apply as Trainer",
      icon: FaUserGraduate,
      href: "/dashboard/member/apply-trainer",
    },
  ],
  trainer: [
    { name: "Overview", icon: FaHome, href: "/dashboard/trainer" },
    {
      name: "My Classes",
      icon: FaChalkboardTeacher,
      href: "/dashboard/trainer/my-classes",
    },
    {
      name: "Add Class",
      icon: FaPlusCircle,
      href: "/dashboard/trainer/add-class",
    },
    {
      name: "Forum Posts",
      icon: FaComments,
      href: "/dashboard/trainer/forum-posts",
    },
    {
      name: "My Forum Posts",
      icon: LuGalleryHorizontalEnd,
      href: "/dashboard/trainer/management",
    },
  ],
  admin: [
    { name: "Dashboard", icon: FaHome, href: "/dashboard/admin" },
    {
      name: "Analytics",
      icon: FaChartLine,
      href: "/dashboard/admin/analytics",
    },
    { name: "Trainers", icon: FaUsers, href: "/dashboard/admin/trainers" },
    {
      name: "Memberships",
      icon: FaIdCard,
      href: "/dashboard/admin/memberships",
    },
    {
      name: "Facilities",
      icon: FaBuilding,
      href: "/dashboard/admin/facilities",
    },
    { name: "Settings", icon: FaCog, href: "/dashboard/admin/settings" },
  ],
};

export default function DashboardSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = authClient.useSession();
  const user = data?.user;
  const role = (user?.role || "member").toLowerCase();
  const navItems = navItemsByRole[role] || navItemsByRole.member;

  useEffect(() => {
    onClose();
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const onSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  };

  const NavLinks = () => (
    <>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-['Inter'] text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "bg-[#D4845A] text-white shadow-md"
                  : "text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#E8E0D8] dark:border-[#3A3530]">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-['Inter'] text-sm font-medium text-[#C47A6A] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
        >
          <FaSignOutAlt className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-[#2D2A24] border-r border-[#E8E0D8] dark:border-[#3A3530] h-screen sticky top-0 overflow-y-auto">
        <Link href="/">
          <div className="p-6 border-b border-[#E8E0D8] dark:border-[#3A3530]">
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#D4845A]">
              VITALIS
            </h1>
            <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
              Gym Management
            </p>
          </div>
        </Link>
        <div className="flex flex-col flex-1">
          <NavLinks />
        </div>
      </aside>

      {/* ========== MOBILE ========== */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#2D2A24] z-50 flex flex-col
          transform transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#E8E0D8] dark:border-[#3A3530]">
          <Link href="/" onClick={onClose}>
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#D4845A]">
              VITALIS
            </h1>
          </Link>

          <button
            onClick={onClose}
            className="text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] transition-colors"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <NavLinks />
      </aside>
    </>
  );
}
