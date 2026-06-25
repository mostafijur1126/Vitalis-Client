import { serverFetch, serverMutation } from "../core/server";

export const getAllTrainer = async (token) => {
  return serverFetch(`/api/trainers`, token);
};
export const getTrainerApplication = async (userId, token) => {
  return serverFetch(`/api/trainerApplication?userId=${userId}`, token);
};

export const getAllTrainerApplication = async (token) => {
  return serverFetch(`/api/getAllApplications`, token);
};

export const approveTrainerApplication = async (
  applicationId,
  feedback,
  token,
) => {
  return serverMutation(
    `/api/trainer-application/${applicationId}`,
    { status: "approved", feedback },
    token,
    "PATCH",
  );
};

export const rejectTrainerApplication = async (
  applicationId,
  feedback,
  token,
) => {
  return serverMutation(
    `/api/trainer-application/${applicationId}`,
    { status: "rejected", feedback },
    token,
    "PATCH",
  );
};

export const cancelTrainerApplication = async (applicationId, token) => {
  return serverMutation(
    `/api/trainer-application/${applicationId}`,
    {},
    token,
    "DELETE",
  );
};
