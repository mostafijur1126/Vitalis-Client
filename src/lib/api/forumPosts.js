import { serverFetch, serverMutation } from "../core/server";

export const getForumPosts = async () => {
  return serverFetch("/api/forumPost");
};
export const getLatestPosts = async () => {
  return serverFetch("/api/latest-forum-posts");
};

export const getForumsPostById = async (id, token) => {
  return serverFetch(`/api/forumPost/${id}`, token);
};

export const deleteForumPost = async (postId) => {
  return serverMutation(`/api/my-post/${postId}`, {}, null, "DELETE");
};

export const getMyForumPost = async (userId, token) => {
  return serverFetch(`/api/my-forumPost?userId=${userId}`, token);
};
