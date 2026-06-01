import {
  useNavigate,
} from "react-router-dom";

import {
  LogOut,
  Plus,
} from "lucide-react";

import {
  useAuth,
} from "../context/AuthContext";

import PostCard
  from "../components/PostCard";

import useHome
  from "../hooks/useHome";

export default function Home() {

  const navigate =
    useNavigate();

  const {
    user,
  } = useAuth();

  const {

    posts,

    commentText,

    setCommentText,

    likePost,

    addComment,

    deletePost,

    handleLogout,

  } = useHome();

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
              onClick={() =>
                navigate("/create-post")
              }
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

        {/* POSTS */}
        <div className="space-y-8">

          {posts.map((post) => (

            <PostCard
              key={post.id}

              post={post}

              user={user}

              commentText={commentText}

              setCommentText={
                setCommentText
              }

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