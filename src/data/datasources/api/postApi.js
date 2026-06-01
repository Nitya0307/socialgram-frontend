import axiosClient from "./axiosClient";

export const fetchPostsApi =
  async () => {

    return await axiosClient.get(
      "/posts"
    );
};

export const createPostApi =
  async (data) => {

    return await axiosClient.post(
      "/posts/create",
      data
    );
};

export const likePostApi =
  async (data) => {

    return await axiosClient.post(
      "/posts/like",
      data
    );
};

export const addCommentApi =
  async (data) => {

    return await axiosClient.post(
      "/posts/comment",
      data
    );
};

export const deletePostApi =
  async (id) => {

    return await axiosClient.delete(
      `/posts/${id}`
    );
};