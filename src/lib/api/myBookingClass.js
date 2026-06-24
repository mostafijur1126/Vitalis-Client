import { serverFetch } from "../core/server";

export const getMyBookings = (userId, token) => {
  return serverFetch(`/api/getbookings?userId=${userId}`, token);
};
