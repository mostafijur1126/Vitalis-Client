// app/dashboard/favorites/page.jsx
import { getUserSession } from "@/lib/core/session";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default async function FavoritesPage() {
  const user = await getUserSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/favorites?userId=${user.id}`,
    { cache: "no-store" },
  );
  const favorites = await res.json();

  return (
    <div className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FaHeart className="w-6 h-6 text-red-500" />
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            My Favorites
          </h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <FaHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-[#6B655A] dark:text-[#B8B0A6] text-lg">
              No favorites yet!
            </p>
            <Link
              href="/classes"
              className="mt-4 inline-block px-6 py-3 bg-[#D4845A] text-white rounded-lg hover:bg-[#B86A42] transition-colors"
            >
              Browse Classes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <Link
                key={fav._id}
                href={`/classes/${fav.classId}`}
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
                    <span className="font-bold text-[#D4845A] text-lg">
                      ${fav.price}
                    </span>
                    <span className="text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                      {fav.duration} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
