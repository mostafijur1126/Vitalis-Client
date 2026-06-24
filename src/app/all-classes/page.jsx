import ClassCard from "@/components/ClassCard";
import SearchClasses from "@/components/SearchClasses";
import { getclasses } from "@/lib/api/allClass";

export default async function AllClassesPage({ searchParams }) {
  const params = await searchParams;
  const search = (await params.search) || "";
  const category = (await params.category) || "";
  const classes = await getclasses(search, category);
  return (
    <div className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            All Classes
          </h1>
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
            Refine your practice with our curated wellness sessions. From
            high-intensity training to restorative flow.
          </p>
        </div>

        {/* Search & Filter (static) */}
        <SearchClasses></SearchClasses>
        {/* Grid of class cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <ClassCard key={cls._id} cls={cls} />
          ))}
        </div>

        {/* Pagination (static) */}
        <div className="flex justify-center items-center gap-2 mt-10 font-['Inter'] text-sm text-[#2D2A24] dark:text-[#EAE5DE]">
          <button className="px-3 py-1 rounded-md bg-[#D4845A] text-white">
            1
          </button>
          <button className="px-3 py-1 rounded-md hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors">
            2
          </button>
          <button className="px-3 py-1 rounded-md hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors">
            3
          </button>
          <span className="text-[#6B655A] dark:text-[#B8B0A6]">...</span>
          <button className="px-3 py-1 rounded-md hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors">
            12
          </button>
          <button className="px-3 py-1 rounded-md hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
