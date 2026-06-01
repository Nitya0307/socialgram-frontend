import { useState }
  from "react";

import {
  createPostUseCase,
} from "../di/container";

import { supabase }
  from "../supabase";

import { useAuth }
  from "../context/AuthContext";

export default function useCreatePost() {

  // LOGGED IN USER
  const { user } =
    useAuth();

  // CAPTION STATE
  const [caption, setCaption] =
    useState("");

  // MULTIPLE IMAGE PREVIEWS
  const [previews, setPreviews] =
    useState([]);

  // LOADING STATE
  const [loading, setLoading] =
    useState(false);

  // ERROR STATE
  const [error, setError] =
    useState("");

  // HANDLE IMAGE CHANGE
  const handleImageChange =
    (e) => {

      const files =
        Array.from(
          e.target.files
        );

      setPreviews((prev) => [
        ...prev,
        ...files,
      ]);
    };

  // REMOVE IMAGE
  const removeImage =
    (index) => {

      const updated =
        previews.filter(
          (_, i) => i !== index
        );

      setPreviews(updated);
    };

  // PUBLISH POST
  const handlePublish =
    async () => {

      try {

        console.log("1 START");

        setLoading(true);

        setError("");

        let mediaUrl = "";

        // CHECK IMAGE EXISTS
        if (previews.length > 0) {

          console.log(
            "2 IMAGE FOUND"
          );

          const file =
            previews[0];

          // UNIQUE FILE NAME
          const fileName =
            `${Date.now()}-${file.name}`;

          console.log(
            "3 BEFORE UPLOAD"
          );

          // UPLOAD TO SUPABASE
          const {
            error: uploadError,
          } =
            await supabase.storage

              .from("posts")

              .upload(
                fileName,
                file
              );

          console.log(
            "4 AFTER UPLOAD"
          );

          // STOP IF UPLOAD FAILS
          if (uploadError) {

            console.log(
              "UPLOAD ERROR",
              uploadError
            );

            throw uploadError;
          }

          // GET PUBLIC URL
          const {
            data,
          } =
            supabase.storage

              .from("posts")

              .getPublicUrl(
                fileName
              );

          mediaUrl =
            data.publicUrl;

          console.log(
            "5 PUBLIC URL",
            mediaUrl
          );
        }

        console.log(
          "6 BEFORE USECASE"
        );

        // CREATE POST
        await createPostUseCase

          .execute({

            user_id:
              user.id,

            description:
              caption,

            media_url:
              mediaUrl,
          });

        console.log(
          "7 AFTER USECASE"
        );

        // CLEAR FORM
        setCaption("");

        setPreviews([]);

      } catch (err) {

        console.log(
          "ERROR",
          err
        );

        setError(
          "Failed to create post"
        );

      } finally {

        console.log(
          "8 FINALLY"
        );

        setLoading(false);
      }
    };

  return {

    caption,

    setCaption,

    previews,

    handleImageChange,

    removeImage,

    handlePublish,

    loading,

    error,
  };
}