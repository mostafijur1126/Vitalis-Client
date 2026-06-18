"use server";

import { serverMutation } from "../core/server";

export const CreateSubscriptions = async (subInfo) => {
  return serverMutation("/api/subscription", subInfo);
};
