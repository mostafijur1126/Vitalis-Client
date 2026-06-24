import { serverMutation } from "../core/server";

export const addForumPosts = (data, token) => {
  return serverMutation("/api/forumPost", data, token);
};
