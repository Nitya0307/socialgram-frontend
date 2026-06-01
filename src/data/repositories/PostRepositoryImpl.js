import PostRepository
  from "../../domain/repositories/PostRepository";

import {
  fetchPostsApi,
  likePostApi,
  addCommentApi,
  deletePostApi,
  createPostApi,
} from "../datasources/api/postApi";

export default class PostRepositoryImpl
  extends PostRepository {


  async fetchPosts() {

    const response =
      await fetchPostsApi();

    return response.data;
  }
  
  async createPost(data) {

  const response =
    await createPostApi(data);

  return response.data;
}

  async likePost(data) {

    const response =
      await likePostApi(data);

    return response.data;
  }

  async addComment(data) {

    const response =
      await addCommentApi(data);

    return response.data;
  }

  async deletePost(id) {

    const response =
      await deletePostApi(id);

    return response.data;
  }
}