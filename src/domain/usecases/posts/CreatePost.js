export default class CreatePost {

  constructor(postRepository) {

    this.postRepository =
      postRepository;
  }

  async execute(data) {

    if (

      !data.description?.trim() &&
      !data.media_url
     
    ) {

      throw new Error(
        "Post cannot be empty"
      );
    }

    return await this
      .postRepository
      .createPost(data);
  }
}