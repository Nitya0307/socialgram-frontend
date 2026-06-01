export default class Comment {

  constructor({
    id,
    user_id,
    post_id,
    comment,
  }) {

    this.id = id;

    this.user_id = user_id;

    this.post_id = post_id;

    this.comment = comment;
  }
}