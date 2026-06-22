import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const getclasses = async () => {
//   return serverFetch(`/api/all-class`);
// };
export const getclasses = async (search = "", category = "") => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);

  if (category && category !== "All Categories") {
    params.set("category", category);
  }

  const res = await fetch(`${baseUrl}/api/all-class?${params.toString()}`);

  return res.json();
};

export const getclassesById = async (id) => {
  return serverFetch(`/api/all-classes/${id}`);
};

export const getMyclasses = async (trainerId) => {
  return serverFetch(`/api/getmyclasses?trainerId=${trainerId}`);
};
