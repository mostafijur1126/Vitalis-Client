import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFeaturedClass = async () => {
  return serverFetch(`/api/featured-classes`);
};

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

export const getclassesById = async (id, token) => {
  const res = await fetch(`${baseUrl}/api/all-classes/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  // handel 401 , 403
  const data = await res.json();
  return data;
};

export const getMyclasses = async (trainerId, token) => {
  return serverFetch(`/api/getmyclasses?trainerId=${trainerId}`, token);
};
export const getMyBookedclasses = async (trainerId, token) => {
  return serverFetch(`/api/trainer/classes/bookings/${trainerId}`, token);
};
export const getTrainerTotalBookings = async (trainerId) => {
  return serverFetch(`/trainer/total-bookings/${trainerId}`);
};
export const getTotalBookings = async () => {
  return serverFetch(`/admin/total-bookings`);
};
