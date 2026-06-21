"use server";

import { revalidatePath } from "next/cache";

export const deleteFavorite = async (userId, classId) => {
  console.log(userId, classId);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      classId,
    }),
  });

  const data = await res.json();

  revalidatePath("/dashboard/member/favorites");

  return data;
};
