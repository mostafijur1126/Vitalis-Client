"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const UpdateClass = async (id, data, token) => {
  const result = await serverMutation(
    `/api/all-classes/${id}`,
    data,
    token,
    "PATCH",
  );
  return result;
};
