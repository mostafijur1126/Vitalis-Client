"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const updateUserRole = async (userId, role = "admin") => {
  const data = await auth.api.setRole({
    body: {
      userId: userId,
      role: role,
    },
    headers: await headers(),
  });
  revalidatePath("/dashboard/admin/manageUsers");
  return data;
};

export const blockUser = async (userId) => {
  const data = await auth.api.banUser({
    body: {
      userId,
    },
    headers: await headers(),
  });
  revalidatePath("/dashboard/admin/manageUsers");
  return data;
};

export const unblockUser = async (userId) => {
  const data = await auth.api.unbanUser({
    body: {
      userId,
    },
    headers: await headers(),
  });
  revalidatePath("/dashboard/admin/manageUsers");
  return data;
};
