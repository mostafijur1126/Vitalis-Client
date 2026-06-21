"use server";

import { serverMutation } from "../core/server";

export const CreateClasses = async (data) => {
  return serverMutation("/api/add-class", data);
};

export const TrainerApplication = async (data) => {
  return serverMutation("/api/trainerApplication", data);
};
