export default class Post {

  constructor({
    id,
    user_id,
    username,
    description,
    media_url,
  }) {

    this.id = id;

    this.user_id = user_id;

    this.username = username;

    this.description = description;

    this.media_url = media_url;
  }
}