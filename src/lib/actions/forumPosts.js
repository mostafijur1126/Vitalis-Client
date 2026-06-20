import { serverMutation } from "../core/server";

export const addForumPosts = (data) => {
  return serverMutation("/api/forumPost", data);
};
