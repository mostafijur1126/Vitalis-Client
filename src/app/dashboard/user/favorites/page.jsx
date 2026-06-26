import FavoriteCard from "@/components/dashboard/user/FavoriteCard";
import { getFavoriteClass } from "@/lib/api/favoriteClass";
import { auth } from "@/lib/auth";
import { getUserSession } from "@/lib/core/session";
import { headers } from "next/headers";

export default async function FavoritesPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    toast.error("Authentication failed. Please login again.");
    return;
  }
  const user = await getUserSession();

  const favorites = await getFavoriteClass(user.id, token);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites?.map((fav) => (
        <FavoriteCard key={fav._id} fav={fav} userId={user.id}></FavoriteCard>
      ))}
    </div>
  );
}
