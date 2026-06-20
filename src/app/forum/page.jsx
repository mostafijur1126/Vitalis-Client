import PostCard from "@/components/communityForum/PostCard";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

// Default sample data with images
const defaultPosts = [
  {
    id: "1",
    title: "Finding Stillness: My 30-Day Morning Meditation Journey",
    excerpt:
      "Consistency has always been my biggest challenge. This month, I committed to 15 minutes of silent meditation before checking any digital devices. Here is what I discovered about focus and daily intention...",
    author: {
      name: "Elena Richardson",
      avatar: null,
      role: "Premium Member",
    },
    createdAt: "2024-10-10T08:30:00Z",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    likes: 124,
    comments: 18,
  },
  {
    id: "2",
    title: "Post-Workout Recovery: The Science of High-Quality Proteins",
    excerpt:
      "Not all protein sources are created equal. In this deep dive, we explore the bioavailability of plant vs. animal proteins and how to time your intake for optimal muscle recovery after our HIIT sessions.",
    author: {
      name: "Marcus Thorne",
      avatar: null,
      role: "Nutrition Lead",
    },
    createdAt: "2024-10-10T05:15:00Z",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    likes: 89,
    comments: 12,
  },
  {
    id: "3",
    title: "5 Common Form Mistakes That Are Sabotaging Your Squat",
    excerpt:
      "Even seasoned lifters can fall into bad habits. We break down the most frequent technique errors and provide simple cues to fix them immediately.",
    author: {
      name: "Jessica Park",
      avatar: null,
      role: "Strength Coach",
    },
    createdAt: "2024-10-09T20:45:00Z",
    category: "Training",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800",
    likes: 56,
    comments: 7,
  },
  {
    id: "4",
    title: "The Mindful Runner: Breathing Techniques for Endurance",
    excerpt:
      "Running is as much mental as physical. Discover how conscious breathwork can help you push through plateaus and make your long runs feel effortless.",
    author: {
      name: "David Chen",
      avatar: null,
      role: "Running Specialist",
    },
    createdAt: "2024-10-09T14:20:00Z",
    category: "Cardio",
    image: "https://images.unsplash.com/photo-1461897106932-1c3bd3b0ce5f?w=800",
    likes: 42,
    comments: 5,
  },
];

export default function ForumPage() {
  // In real app: fetch posts from API
  const posts = defaultPosts;

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
            <PostCard key={post.id} post={post} />
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
