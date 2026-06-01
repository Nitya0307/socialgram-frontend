export default class SignupUser {

  constructor(authRepository) {

    this.authRepository =
      authRepository;
  }

  async execute(data) {

    if (
      !data.username ||
      !data.email ||
      !data.password
    ) {

      throw new Error(
        "All fields are required"
      );
    }

    return await this.authRepository
      .signup(data);
  }
}