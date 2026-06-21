import { serverFetch } from "../core/server";

export const getMyBookings = (userId) => {
  return serverFetch(`/api/getbookings?userId=${userId}`);
};
