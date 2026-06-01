export default class FetchPosts {

  constructor(postRepository) {

    this.postRepository =
      postRepository;
  }

  async execute() {

    return await this.postRepository
      .fetchPosts();
  }
}