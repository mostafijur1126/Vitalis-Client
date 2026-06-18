import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getclasses = async () => {
  return serverFetch(`/api/all-class`);
};
export const getclassesById = async (id) => {
  return serverFetch(`/api/all-classes/${id}`);
};
