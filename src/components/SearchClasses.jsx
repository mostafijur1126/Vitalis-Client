"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchClasses = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const [category, setCategory] = useState(
    searchParams.get("category") || "All Categories",
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search);
      }

      if (category !== "All Categories") {
        params.set("category", category);
      }

      const query = params.toString();

      router.replace(`/all-classes${query ? `?${query}` : ""}`);
    }, 500); // debounce

    return () => clearTimeout(timeout);
  }, [search, category, router]);

  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search classes..."
        className="flex-1 px-4 py-2 bg-white dark:bg-[#2D2A24] border border-[#E8E0D8] dark:border-[#3A3530] rounded-lg font-['Inter'] text-sm text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] transition-colors"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 bg-white dark:bg-[#2D2A24] border border-[#E8E0D8] dark:border-[#3A3530] rounded-lg font-['Inter'] text-sm text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] transition-colors"
      >
        <option>All Categories</option>
        <option>Yoga</option>
        <option>HIIT</option>
        <option>Strength</option>
        <option>Pilates</option>
      </select>
    </div>
  );
};

export default SearchClasses;
