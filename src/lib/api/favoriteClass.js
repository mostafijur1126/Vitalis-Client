import { serverFetch } from "../core/server";

export const getFavoriteClass = (userId) => {
  return serverFetch(`/api/favorites?userId=${userId}`);
};
