import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import MyPostCard from "@/components/dashboard/trainer/MyPostCard";
import { getMyForumPost } from "@/lib/api/forumPosts";
import { getUserSession } from "@/lib/core/session";

export default async function MyPostsPage() {
  const user = await getUserSession();
  const trainerId = user?.id;
  const myForumPosts = (await getMyForumPost(trainerId)) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            My Posts
          </h1>
          <p className="text-[#6B655A] dark:text-[#B8B0A6] font-['Inter'] text-sm">
            {myForumPosts.length} {myForumPosts.length === 1 ? "post" : "posts"}{" "}
            published
          </p>
        </div>
        <Link
          href="/dashboard/trainer/forum-posts"
          className="inline-flex items-center gap-2 bg-[#D4845A] text-white px-4 py-2 rounded-lg font-['Inter'] text-sm font-medium hover:bg-[#B86A42] transition-colors shadow-sm whitespace-nowrap"
        >
          <FaPlus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Posts Grid */}
      {myForumPosts.length === 0 ? (
        <div className="bg-white dark:bg-[#2D2A24] rounded-2xl p-12 text-center border border-[#E8E0D8] dark:border-[#3A3530]">
          <p className="text-[#6B655A] dark:text-[#B8B0A6] font-['Inter']">
            You haven't created any posts yet.
          </p>
          <Link
            href="/forum/create"
            className="inline-block mt-4 px-5 py-2.5 bg-[#D4845A] text-white rounded-lg font-['Inter'] text-sm hover:bg-[#B86A42] transition-colors"
          >
            Write Your First Post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {myForumPosts.map((post) => (
            <MyPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
