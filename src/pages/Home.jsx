import { useEffect, useState } from "react";
import axios from "axios";
import {
  Heart,
  MessageCircle,
  Trash2,
  Pencil,
  LogOut,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});

  const navigate = useNavigate();

  // LOGGED IN USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

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
          user_id: user.id,
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
          user_id: user.id,
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
  const handleLogout = () => {

    localStorage.removeItem("user");

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

            <div
              key={post.id}
              className="bg-white/[0.03] border border-white/10 rounded-3xl p-6"
            >

              {/* USER */}
              <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-xl bg-violet-500 flex items-center justify-center font-bold text-lg">
                    {post.username?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {post.username}
                    </h3>
                  </div>
                </div>

                {/* OWNER ONLY */}
                {user.id === post.user_id && (

                  <div className="flex gap-4">

                    <button>
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        deletePost(post.id)
                      }
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                )}
              </div>

              {/* IMAGE */}
              {post.media_url && (
                <img
                  src={post.media_url}
                  alt=""
                  className="w-full rounded-3xl mb-5"
                />
              )}

              {/* CAPTION */}
              <p className="text-zinc-300 mb-6">
                {post.description}
              </p>

              {/* ACTIONS */}
              <div className="flex items-center gap-6 text-zinc-400 mb-5">

                {/* LIKE */}
                <button
                  onClick={() => likePost(post.id)}
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Heart size={20} />
                  {post.likes_count || 0} Likes
                </button>

                {/* COMMENTS */}
                <button className="flex items-center gap-2 hover:text-white">
                  <MessageCircle size={20} />
                  {post.comments_count || 0} Comments
                </button>

              </div>

              {/* COMMENT INPUT */}
              <div className="flex gap-3">

                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText[post.id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [post.id]: e.target.value,
                    })
                  }
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
                />

                <button
                  onClick={() => addComment(post.id)}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90"
                >
                  Post
                </button>

              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}