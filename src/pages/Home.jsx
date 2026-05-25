import { useEffect, useState } from "react";
import axios from "axios";
import {
  LogOut,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  // FETCH POSTS
  const fetchPosts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/posts"
      );

      setPosts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // DELETE POST
  const deletePost = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/posts/${id}`
      );

      fetchPosts();

    } catch (error) {

      console.log(error);
    }
  };

  // LIKE POST
  const likePost = async (postId) => {

    try {

      await axios.post(
        "http://localhost:5000/posts/like",
        {
          user_id: user?.id,
          post_id: postId,
        }
      );

      fetchPosts();

    } catch (error) {

      console.log(error);
    }
  };

  // ADD COMMENT
  const addComment = async (postId) => {

    try {

      if (!commentText[postId]?.trim()) {
        return;
      }

      await axios.post(
        "http://localhost:5000/posts/comment",
        {
          user_id: user?.id,
          post_id: postId,
          comment: commentText[postId],
        }
      );

      // CLEAR INPUT
      setCommentText({
        ...commentText,
        [postId]: "",
      });

      fetchPosts();

    } catch (error) {

      console.log(error);
    }
  };

  // LOGOUT
  const handleLogout = async () => {

    logout();

    await supabase.auth.signOut();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white py-10 px-6">

      <div className="max-w-2xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">

          <h1 className="text-3xl font-bold">
            Home
          </h1>

          <div className="flex items-center gap-4">

            {/* CREATE POST BUTTON */}
            <button
              onClick={() => navigate("/create-post")}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 transition"
            >
              <Plus size={18} />
              Create
            </button>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

        <div className="space-y-8">

          {posts.map((post) => (

            <PostCard
              key={post.id}
              post={post}
              user={user}
              commentText={commentText}
              setCommentText={setCommentText}
              likePost={likePost}
              addComment={addComment}
              deletePost={deletePost}
            />

          ))}

        </div>
      </div>
    </div>
  );
}