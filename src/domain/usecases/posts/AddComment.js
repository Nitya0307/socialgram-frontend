export default class AddComment {

  constructor(postRepository) {

    this.postRepository =
      postRepository;
  }

  async execute(data) {

    return await this.postRepository
      .addComment(data);
  }
}