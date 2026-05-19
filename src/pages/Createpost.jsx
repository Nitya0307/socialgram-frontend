import { useState } from "react";
import { Image, Globe, X } from "lucide-react";

export default function Createpost() {

  const [caption, setCaption] = useState("");
  const [previews, setPreviews] = useState([]);

  // GET LOGGED IN USER
  const user = JSON.parse(localStorage.getItem("user"));

  // HANDLE MULTIPLE IMAGE UPLOAD
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const imageUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews((prev) => [...prev, ...imageUrls]);
  };

  // REMOVE IMAGE
  const removeImage = (index) => {
    setPreviews(previews.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* GLOW */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px]" />

      <div className="relative z-10 px-6 py-10">

        {/* HEADER */}
        <div className="max-w-3xl mx-auto mb-10">

          <h1 className="text-5xl font-bold tracking-tight mb-3">
            Create post
          </h1>

          <p className="text-zinc-500 text-lg">
            Share your thoughts, photos, and moments with the world.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="max-w-3xl mx-auto">

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/40 p-8">

            {/* USER INFO */}
            <div className="flex items-center gap-4 mb-8">

              {/* AVATAR */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-xl font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {user?.username}
                </h3>

                <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
                  <Globe size={14} />
                  Public
                </div>
              </div>
            </div>

            {/* IMAGE PREVIEWS */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8">

                {previews.map((img, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <img
                      src={img}
                      alt="preview"
                      className="w-full h-[240px] object-cover rounded-3xl border border-white/10"
                    />

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-full transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TEXTAREA BELOW IMAGES */}
            <div className="mb-8">

              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="w-full min-h-[140px] bg-white/[0.03] border border-white/10 rounded-3xl p-6 text-lg outline-none resize-none focus:border-violet-500 transition"
                maxLength={300}
              />

              {/* CHARACTER COUNT */}
              <div className="flex justify-end mt-3">
                <span className="text-sm text-zinc-500">
                  {caption.length}/300
                </span>
              </div>
            </div>

            {/* ACTION BAR */}
            <div className="flex items-center justify-between gap-6 flex-wrap">

              {/* ADD PHOTO */}
              <label className="cursor-pointer">

                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />

                <div className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition">
                  <Image size={18} />
                  <span>Add photos</span>
                </div>
              </label>

              {/* POST BUTTON */}
              <button
                disabled={!caption.trim() && previews.length === 0}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all
                  ${
                    caption.trim() || previews.length > 0
                      ? "bg-gradient-to-r from-violet-500 to-indigo-500 hover:opacity-90 shadow-lg shadow-violet-500/20"
                      : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  }`}
              >
                Publish post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}