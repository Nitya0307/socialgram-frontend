export default class LoginUser {

  constructor(authRepository) {

    this.authRepository =
      authRepository;
  }

  async execute(data) {

    if (!data.identifier ||
        !data.password) {

      throw new Error(
        "All fields are required"
      );
    }

    return await this.authRepository
      .login(data);
  }
}