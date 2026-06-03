import axiosClient from "./axiosClient";

export const fetchPostsApi =
  async () => {

    return await axiosClient.get(
      "/posts"
    );
};

export const createPostApi =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      );

    return await axiosClient.post(
      "/posts/create",
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
};

export const likePostApi =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      );

    return await axiosClient.post(
      "/posts/like",
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
};

export const addCommentApi =
  async (data) => {

    const token =
      localStorage.getItem(
        "token"
      );

    return await axiosClient.post(
      "/posts/comment",
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
};

export const deletePostApi =
  async (id) => {

    const token =
      localStorage.getItem(
        "token"
      );

    return await axiosClient.delete(
      `/posts/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
};