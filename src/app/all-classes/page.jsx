import Link from "next/link";
import ClassCard from "@/components/ClassCard";
import SearchClasses from "@/components/SearchClasses";
import { getclasses } from "@/lib/api/allClass";

const getPageUrl = (page, search, category) => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category && category !== "All Categories")
    params.set("category", category);
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return `/all-classes${query ? `?${query}` : ""}`;
};

export default async function AllClassesPage({ searchParams }) {
  const params = await searchParams;
  const search = (await params.search) || "";
  const category = (await params.category) || "";
  const currentPage = Number((await params.page) || 1);
  const pageSize = 6;
  const response = await getclasses(search, category, currentPage, pageSize);
  const classes = Array.isArray(response) ? response : response.data || [];
  const totalPages = response.totalPages || 1;
  const activePage = Math.min(Math.max(1, currentPage), totalPages);

  const pageNumbers = [];
  const startPage = Math.max(1, activePage - 2);
  const endPage = Math.min(totalPages, activePage + 2);

  for (let page = startPage; page <= endPage; page += 1) {
    pageNumbers.push(page);
  }

  if (startPage > 1) {
    if (startPage > 2) pageNumbers.unshift("dots");
    pageNumbers.unshift(1);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pageNumbers.push("dots");
    pageNumbers.push(totalPages);
  }

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
        <SearchClasses />

        {/* Grid of class cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {classes.map((cls) => (
            <ClassCard key={cls._id} cls={cls} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-10 font-['Inter'] text-sm text-[#2D2A24] dark:text-[#EAE5DE]">
            <Link
              href={getPageUrl(Math.max(1, activePage - 1), search, category)}
              className={`px-3 py-1 rounded-md transition-colors ${
                activePage === 1
                  ? "bg-[#E8E0D8] text-[#6B655A] cursor-not-allowed"
                  : "bg-[#D4845A] text-white hover:bg-[#B86A42]"
              }`}
            >
              Prev
            </Link>

            {pageNumbers.map((page, index) =>
              page === "dots" ? (
                <span
                  key={`dots-${index}`}
                  className="px-3 py-1 rounded-md text-[#6B655A] dark:text-[#B8B0A6]"
                >
                  …
                </span>
              ) : (
                <Link
                  key={`page-${page}`}
                  href={getPageUrl(page, search, category)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    page === activePage
                      ? "bg-[#D4845A] text-white"
                      : "bg-white dark:bg-[#2D2A24] text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530]"
                  }`}
                >
                  {page}
                </Link>
              ),
            )}

            <Link
              href={getPageUrl(
                Math.min(totalPages, activePage + 1),
                search,
                category,
              )}
              className={`px-3 py-1 rounded-md transition-colors ${
                activePage === totalPages
                  ? "bg-[#E8E0D8] text-[#6B655A] cursor-not-allowed"
                  : "bg-[#D4845A] text-white hover:bg-[#B86A42]"
              }`}
            >
              Next
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
