import { serverFetch } from "../core/server";

export const getTrainerApplication = async (userId) => {
  return serverFetch(`/api/trainerApplication?userId=${userId}`);
};
