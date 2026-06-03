import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import {
  supabase,
} from "../supabase";

import {
  fetchPostsUseCase,
  likePostUseCase,
  addCommentUseCase,
} from "../di/container";

export default function useHome() {

  const navigate =
    useNavigate();

  const { logout } =
    useAuth();

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [commentText,
    setCommentText] =
    useState({});

  // FETCH POSTS
  const fetchPosts =
    async () => {

      try {

        setLoading(true);

        const data =
          await fetchPostsUseCase
            .execute();

        setPosts(data);

      } catch (err) {

        console.log(err);

        setError(
          "Failed to fetch posts"
        );

      } finally {

        setLoading(false);
      }
    };

  // LIKE POST
  const likePost =
    async (postId) => {

      try {

        await likePostUseCase
          .execute({
            post_id: postId,
          });

        fetchPosts();

      } catch (err) {

        console.log(err);
      }
    };

  // ADD COMMENT
  const addComment =
    async (postId) => {

      try {

        await addCommentUseCase
          .execute({
            post_id: postId,
            comment:
              commentText[postId],
          });

        setCommentText({
          ...commentText,
          [postId]: "",
        });

        fetchPosts();

      } catch (err) {

        console.log(err);
      }
    };

  // LOGOUT
const handleLogout =
  async () => {

    try {

      // GO TO LANDING FIRST
      navigate(
        "/",
        {
          replace: true,
        }
      );

      // THEN CLEAR AUTH
      await supabase.auth
        .signOut();

      logout();

    } catch (err) {

      console.log(err);
    }
  };


  useEffect(() => {

    fetchPosts();

  }, []);

  return {

    posts,

    loading,

    error,

    commentText,

    setCommentText,

    likePost,

    addComment,

    fetchPosts,

    handleLogout,
  };
}