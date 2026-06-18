"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { FaBars, FaTimes, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname.includes("dashboard")) {
    return null;
  }

  const isActive = (path) => pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Classes", path: "/classes" },
    { name: "Community Forum", path: "/forum" },
  ];

  if (user) {
    navItems.push({ name: "Dashboard", path: `/dashboard/${user?.role}` });
  }
  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <nav className="bg-white dark:bg-[#1E1C18] border-b border-[#E8E0D8] dark:border-[#3A3530] shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="px-6 mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-['Playfair_Display'] text-2xl font-bold text-[#D4845A] tracking-wide">
              VITALIS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-['Inter'] text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-[#D4845A] border-b-2 border-[#D4845A] pb-1"
                    : "text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] dark:hover:text-[#D4845A]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side: Theme Toggle + Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark/Light Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            )}

            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover border-2 border-[#D4845A]"
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-[#D4845A]" />
                  )}
                  <span className="font-['Inter'] text-sm text-[#2D2A24] dark:text-[#EAE5DE]">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="font-['Inter'] text-sm text-[#C47A6A] hover:text-[#D4845A] transition-colors flex items-center space-x-1"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="font-['Inter'] text-sm font-medium bg-[#D4845A] text-white px-4 py-2 rounded-lg hover:bg-[#B86A42] transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme toggle on mobile */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } bg-white dark:bg-[#1E1C18] border-t border-[#E8E0D8] dark:border-[#3A3530]`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block font-['Inter'] text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-[#D4845A] text-white"
                  : "text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530]"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="border-t border-[#E8E0D8] dark:border-[#3A3530] pt-2 mt-2">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover border-2 border-[#D4845A]"
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-[#D4845A]" />
                  )}
                  <span className="font-['Inter'] text-sm text-[#2D2A24] dark:text-[#EAE5DE]">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="font-['Inter'] text-sm text-[#C47A6A] hover:text-[#D4845A] transition-colors flex items-center space-x-1"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="block font-['Inter'] text-sm font-medium py-2 px-3 rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530]"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block font-['Inter'] text-sm font-medium py-2 px-3 rounded-lg bg-[#D4845A] text-white text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
