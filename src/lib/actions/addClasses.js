"use server";

import { serverMutation } from "../core/server";

export const CreateClasses = async (data, token) => {
  return serverMutation("/api/add-class", data, token);
};

export const TrainerApplication = async (data) => {
  return serverMutation("/api/trainerApplication", data);
};
