// AUTH REPOSITORY
import AuthRepositoryImpl
  from "../data/repositories/AuthRepositoryImpl";

// AUTH USECASES
import LoginUser
  from "../domain/usecases/auth/LoginUser";

import SignupUser
  from "../domain/usecases/auth/SignupUser";

import LogoutUser
  from "../domain/usecases/auth/LogoutUser";

// POST REPOSITORY
import PostRepositoryImpl
  from "../data/repositories/PostRepositoryImpl";

// POST USECASES
import CreatePost
from "../domain/usecases/posts/CreatePost";

import FetchPosts
  from "../domain/usecases/posts/FetchPosts";

import LikePost
  from "../domain/usecases/posts/LikePost";

import AddComment
  from "../domain/usecases/posts/AddComment";

import GoogleLoginUser
from "../domain/usecases/auth/GoogleLoginUser";

// ============================
// REPOSITORIES
// ============================

const authRepository =
  new AuthRepositoryImpl();

const postRepository =
  new PostRepositoryImpl();

// ============================
// AUTH USECASES
// ============================

export const loginUserUseCase =
  new LoginUser(authRepository);

export const signupUserUseCase =
  new SignupUser(authRepository);

export const logoutUserUseCase =
  new LogoutUser(authRepository);

// ============================
// POST USECASES
// ============================
export const createPostUseCase =
  new CreatePost(postRepository);

export const fetchPostsUseCase =
  new FetchPosts(postRepository);

export const likePostUseCase =
  new LikePost(postRepository);

export const addCommentUseCase =
  new AddComment(postRepository);

export const googleLoginUserUseCase =
  new GoogleLoginUser(
    authRepository
  );