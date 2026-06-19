"use server";

import { serverMutation } from "../core/server";

export const bookClass = async (data) => {
  return serverMutation("/api/bookClass", data);
};
