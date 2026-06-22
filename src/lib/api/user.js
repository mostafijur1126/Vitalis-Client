import { serverFetch } from "../core/server";

export const getAllUsers = () => {
  return serverFetch("/api/all-users");
};
