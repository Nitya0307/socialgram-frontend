import { useState }
  from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  createPostUseCase,
} from "../di/container";

import { supabase }
  from "../supabase";


export default function useCreatePost() {

  const navigate =
    useNavigate();



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

          const fileName =
            `${Date.now()}-${file.name}`;

          console.log(
            "3 BEFORE UPLOAD"
          );

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

          if (uploadError) {

            console.log(
              "UPLOAD ERROR",
              uploadError
            );

            throw uploadError;
          }

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
          "CAPTION:",
          caption
        );

        console.log(
          "MEDIA URL:",
          mediaUrl
        );

        console.log(
          "6 BEFORE USECASE"
        );

        const response =
          await createPostUseCase

            .execute({


              description:
                caption,

              media_url:
                mediaUrl,
            });

        console.log(
          "POST RESPONSE:",
          response
        );

        console.log(
          "7 AFTER USECASE"
        );

        // CLEAR FORM
        setCaption("");

        setPreviews([]);

        // GO TO HOME PAGE
        navigate("/home");

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