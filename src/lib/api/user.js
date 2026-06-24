import { serverFetch } from "../core/server";

export const getAllUsers = (token) => {
  return serverFetch("/api/all-users", token);
};
