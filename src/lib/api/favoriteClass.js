import { serverFetch } from "../core/server";

export const getFavoriteClass = (userId, token) => {
  return serverFetch(`/api/favorites?userId=${userId}`, token);
};
