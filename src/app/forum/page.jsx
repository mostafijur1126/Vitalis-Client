import PostCard from "@/components/communityForum/PostCard";
import { getForumPosts } from "@/lib/api/forumPosts";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function ForumPage() {
  const posts = await getForumPosts();

  return (
    <div className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
              Community Forum
            </h1>
            <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
              Join the conversation with fellow wellness enthusiasts. Share
              progress, tips, and inspiration from your fitness journey.
            </p>
          </div>
          <Link
            href="/forum/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
          >
            <FaPlus className="w-4 h-4" />
            Add Post
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        {/* View More Button */}
        {posts.length > 0 && (
          <div className="mt-10 text-center">
            <button className="px-8 py-2.5 border-2 border-[#D4845A] text-[#D4845A] font-['Inter'] font-medium rounded-lg hover:bg-[#D4845A] hover:text-white transition-colors">
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
