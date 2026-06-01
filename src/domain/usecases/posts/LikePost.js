export default class LikePost {

  constructor(postRepository) {

    this.postRepository =
      postRepository;
  }

  async execute(data) {

    return await this.postRepository
      .likePost(data);
  }
}