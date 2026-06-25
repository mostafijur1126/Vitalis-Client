import { serverFetch, serverMutation } from "../core/server";

export const getAllUsers = (token) => {
  return serverFetch("/api/all-users", token);
};

export const setUserRole = (userId, role, token) => {
  return serverMutation(`/api/users/${userId}/role`, { role }, token, "PATCH");
};
