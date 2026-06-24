import { serverFetch } from "../core/server";

export const getTrainerApplication = async (userId, token) => {
  return serverFetch(`/api/trainerApplication?userId=${userId}`, token);
};
