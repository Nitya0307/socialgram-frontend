export default class GoogleLoginUser {

  constructor(authRepository) {

    this.authRepository =
      authRepository;
  }

  async execute(googleUser) {

    let existingUser =
      await this.authRepository
        .getGoogleUser(
          googleUser.email
        );

    existingUser =
      existingUser.user;

    // CREATE USER IF NOT EXISTS
    if (!existingUser) {

      const response =
        await this.authRepository
          .googleSignup({

            username:
              googleUser.user_metadata
                .full_name ||
              googleUser.email,

            email:
              googleUser.email,

            mobile: "",

            profile_pic:
              googleUser.user_metadata
                .avatar_url || "",
          });

      existingUser =
        response.user;
    }

    return existingUser;
  }
}