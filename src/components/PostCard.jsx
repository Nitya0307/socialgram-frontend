import {
  Heart,
  MessageCircle,
  Trash2,
  Pencil,
} from "lucide-react";

export default function PostCard({
  post,
  user,
  commentText,
  setCommentText,
  likePost,
  addComment,
  deletePost,
}) {

  return (
    <div
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
        {user && user.id === post.user_id && (

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
  );
}