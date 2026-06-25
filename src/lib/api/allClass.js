import { serverFetch, serverMutation } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const getFeaturedClass = async () => {
  return serverFetch(`/api/featured-classes`);
};

// export const getclasses = async () => {
//   return serverFetch(`/api/all-class`);
// };
export const getclasses = async (
  search = "",
  category = "",
  page = 1,
  limit = 6,
) => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category && category !== "All Categories")
    params.set("category", category);
  if (page > 1) params.set("page", String(page));
  if (limit) params.set("limit", String(limit));

  const requestUrl = `${baseUrl}/api/all-class?${params.toString()}`;
  const res = await fetch(requestUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch classes: ${res.status}`);
  }
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

export const getAdminAllClasses = async () => {
  return serverFetch(`/admin/all-classesByAdmin`);
};

export const approveClassByAdmin = (classId, token) => {
  return serverMutation(
    `/api/admin/classes/${classId}`,
    { status: "approved" },
    token,
    "PATCH",
  );
};

export const rejectClassByAdmin = (classId, token) => {
  return serverMutation(
    `/api/admin/classes/${classId}`,
    { status: "rejected" },
    token,
    "PATCH",
  );
};

export const deleteClassByAdmin = (classId, token) => {
  return serverMutation(`/api/admin/classes/${classId}`, {}, token, "DELETE");
};
