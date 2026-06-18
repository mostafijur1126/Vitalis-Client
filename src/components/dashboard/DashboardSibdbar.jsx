"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FaHome,
  FaBook,
  FaHeart,
  FaUserGraduate,
  FaSignOutAlt,
  FaBars,
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
  FaUserCircle,
} from "react-icons/fa";

const navItemsByRole = {
  member: [
    { name: "Overview", icon: FaHome, href: "/dashboard" },
    { name: "Bookings", icon: FaBook, href: "/dashboard/bookings" },
    { name: "Favorites", icon: FaHeart, href: "/dashboard/favorites" },
    {
      name: "Apply as Trainer",
      icon: FaUserGraduate,
      href: "/dashboard/apply-trainer",
    },
  ],
  trainer: [
    { name: "Overview", icon: FaHome, href: "/dashboard/trainer" },
    { name: "Bookings", icon: FaBook, href: "/dashboard/trainer/bookings" },
    { name: "Favorites", icon: FaHeart, href: "/dashboard/trainer/favorites" },
    {
      name: "Apply as Trainer",
      icon: FaUserGraduate,
      href: "/dashboard/trainer/apply",
    },
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
      name: "Management Tools",
      icon: FaTools,
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

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data } = authClient.useSession();
  const user = data?.user;
  const role = (user?.role || "member").toLowerCase();
  const navItems = navItemsByRole[role] || navItemsByRole.member;

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const onSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
      },
    });
  };

  const isActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const renderNavItems = () =>
    navItems.map((item) => {
      const Icon = item.icon;
      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setSidebarOpen(false)}
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
    });

  return (
    <div className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] flex transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-[#2D2A24] border-r border-[#E8E0D8] dark:border-[#3A3530] h-screen sticky top-0 overflow-y-auto transition-colors duration-300">
        <div className="flex flex-col h-full">
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <div className="p-6 border-b border-[#E8E0D8] dark:border-[#3A3530]">
              <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#D4845A]">
                VITALIS
              </h1>
              <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                Gym Management
              </p>
            </div>
          </Link>
          <nav className="flex-1 px-4 py-6 space-y-1">{renderNavItems()}</nav>
          <div className="p-4 border-t border-[#E8E0D8] dark:border-[#3A3530]">
            <div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-[#2D2A24] dark:text-[#EAE5DE]"
              >
                <FaBars size={24} />
              </button>
              <div className="flex items-center gap-3">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#D4845A]"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-[#D4845A]" />
                )}
                <span className="font-['Inter'] text-sm text-[#2D2A24] dark:text-[#EAE5DE] hidden sm:inline">
                  {user?.name || "User"}
                </span>
              </div>
            </div>
            <button
              onClick={onSignOut}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-['Inter'] text-sm font-medium text-[#C47A6A] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
            >
              <FaSignOutAlt className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#2D2A24] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[#E8E0D8] dark:border-[#3A3530]">
            <Link href="/" onClick={() => setSidebarOpen(false)}>
              <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[#D4845A]">
                VITALIS
              </h1>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-[#2D2A24] dark:text-[#EAE5DE]"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">{renderNavItems()}</nav>
          <div className="p-4 border-t border-[#E8E0D8] dark:border-[#3A3530]">
            <button
              onClick={onSignOut}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-['Inter'] text-sm font-medium text-[#C47A6A] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
            >
              <FaSignOutAlt className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
