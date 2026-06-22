"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaImage, FaTimes, FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import { imageUpload } from "@/lib/imgUpload";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { addForumPosts } from "@/lib/actions/forumPosts";
import toast from "react-hot-toast";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const isFormValid = title.trim() !== "" && description.trim() !== "";

  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);

  const handleRemoveImage = () => {
    setImage(null);
    // Reset file input
    const fileInput = document.getElementById("imageInput");
    if (fileInput) fileInput.value = "";
  };

  const resetForm = () => {
    (setTitle(""), setDescription(""), setImage(null));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const formData = {
      title,
      description,
      image,
      userName: user?.name,
      userImage: user?.image,
      userRole: user?.role,
      userId: user?.id,
    };
    try {
      const result = await addForumPosts(formData);
      if (result.insertedId) {
        toast.success("Class added successfully!");
        resetForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("Faild to add class");
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white dark:bg-[#2D2A24] rounded-2xl shadow-lg border border-[#E8E0D8] dark:border-[#3A3530] p-6 md:p-8"
      >
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#D4845A] transition-colors font-['Inter'] text-sm"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Forum
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Create New Post
          </h1>
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
            Share your fitness insights, tips, or success story with the
            community.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Title */}
          <div>
            <label
              htmlFor="title"
              className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1"
            >
              Post Title <span className="text-[#C47A6A]">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a compelling title..."
              className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1">
              Post Image{" "}
              <span className="text-[#6B655A] dark:text-[#B8B0A6] text-xs font-normal">
                (optional)
              </span>
            </label>
            {uploading ? (
              <div className="w-full h-48 flex items-center justify-center border rounded-lg">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-[#D4845A]" />
              </div>
            ) : image ? (
              <div className="relative w-full h-56 rounded-lg overflow-hidden border border-[#E8E0D8] dark:border-[#3A3530]">
                <Image
                  width={400}
                  height={200}
                  src={image}
                  alt="image preview"
                  unoptimized
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="w-full h-56 bg-[#F5EDE6] dark:bg-[#3A3530] border-2 border-dashed border-[#E8E0D8] dark:border-[#4A4540] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#D4845A] transition-colors">
                  <FaImage className="w-8 h-8 text-[#6B655A] dark:text-[#B8B0A6] mb-2" />
                  <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                    Click to upload an image
                  </p>
                  <p className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6] mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
                {/* <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                /> */}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    // console.log(file);
                    if (!file) return;
                    try {
                      setUploading(true);
                      const image = await imageUpload(file);
                      // console.log("uploaded image:", image);
                      setImage(image.url);
                    } catch (error) {
                      console.error(error);
                    } finally {
                      setUploading(false);
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] block mb-1"
            >
              Description <span className="text-[#C47A6A]">*</span>
            </label>
            <textarea
              id="description"
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your post content here..."
              className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 transition-all font-['Inter'] text-sm resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`flex-1 py-2.5 font-['Inter'] font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
                isFormValid
                  ? "bg-[#D4845A] text-white hover:bg-[#B86A42]"
                  : "bg-[#E8E0D8] dark:bg-[#3A3530] text-[#8A847C] dark:text-[#6B655A] cursor-not-allowed"
              }`}
            >
              <FaPencilAlt className="w-4 h-4" />
              Publish Post
            </button>
            <Link
              href="/forum"
              className="flex-1 py-2.5 border-2 border-[#E8E0D8] dark:border-[#3A3530] text-[#2D2A24] dark:text-[#EAE5DE] font-['Inter'] font-semibold rounded-lg hover:border-[#D4845A] hover:text-[#D4845A] transition-colors text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
