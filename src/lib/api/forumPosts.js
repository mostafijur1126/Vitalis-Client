import { serverFetch } from "../core/server";

export const getForumPosts = async () => {
  return serverFetch("/api/forumPost");
};
export const getLatestPosts = async () => {
  return serverFetch("/api/latest-forum-posts");
};

export const getForumsPostById = async (id, token) => {
  return serverFetch(`/api/forumPost/${id}`, token);
};

export const getMyForumPost = async (userId, token) => {
  return serverFetch(`/api/my-forumPost?userId=${userId}`, token);
};
