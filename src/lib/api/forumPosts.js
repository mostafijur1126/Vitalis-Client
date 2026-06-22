import { serverFetch } from "../core/server";

export const getForumPosts = async () => {
  return serverFetch("/api/forumPost");
};

export const getForumsPostById = async (id) => {
  return serverFetch(`/api/forumPost/${id}`);
};

export const getMyForumPost = async (userId) => {
  return serverFetch(`/api/my-forumPost?userId=${userId}`);
};
