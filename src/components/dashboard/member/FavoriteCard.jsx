"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { deleteFavorite } from "@/lib/actions/deleteFavorite";

export default function FavoriteCard({ fav, userId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteFavorite(userId, fav.classId);

      toast.success("Removed from favorites");

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error("Failed to remove favorite");
    }
  };

  return (
    <Link
      href={`/all-classes/${fav.classId}`}
      className="bg-white dark:bg-[#2D2A24] rounded-2xl shadow-md border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={fav.classImage}
          alt={fav.className}
          fill
          className="object-cover"
        />

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="absolute top-3 left-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
        >
          <FaTrash />
        </button>

        <div className="absolute top-3 right-3">
          <FaHeart className="w-5 h-5 text-red-500" />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#D4845A] bg-[#D4845A]/10 px-2 py-1 rounded-full">
          {fav.category}
        </span>

        <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#2D2A24] dark:text-[#EAE5DE] mt-2">
          {fav.className}
        </h3>

        <p className="text-sm text-[#6B655A] dark:text-[#B8B0A6]">
          by {fav.author}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-[#D4845A] text-lg">${fav.price}</span>

          <span className="text-xs text-[#6B655A] dark:text-[#B8B0A6]">
            {fav.duration} min
          </span>
        </div>
      </div>
    </Link>
  );
}
