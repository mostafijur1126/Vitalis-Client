import ClassCard from "@/components/ClassCard";
import { getclasses } from "@/lib/api/allClass";

// Dummy data for classes
// const classes = [
//   {
//     id: 1,
//     name: "Vinyasa Morning Flow",
//     price: 25,
//     trainer: "Sarah Jenkins",
//     duration: "60 mins",
//     bookings: 12,
//   },
//   {
//     id: 2,
//     name: "Peak Performance HIIT",
//     price: 30,
//     trainer: "Marcus Thorne",
//     duration: "45 mins",
//     bookings: 8,
//   },
//   {
//     id: 3,
//     name: "Core Reformer Session",
//     price: 45,
//     trainer: "Elena Rodriguez",
//     duration: "50 mins",
//     bookings: 5,
//   },
//   {
//     id: 4,
//     name: "Foundational Strength",
//     price: 20,
//     trainer: "David Chen",
//     duration: "60 mins",
//     bookings: 20,
//   },
//   {
//     id: 5,
//     name: "Endurance Revolution",
//     price: 18,
//     trainer: "Aria Vane",
//     duration: "45 mins",
//     bookings: 15,
//   },
//   {
//     id: 6,
//     name: "Mobility & Release",
//     price: 15,
//     trainer: "Julian Mars",
//     duration: "30 mins",
//     bookings: 30,
//   },
// ];

export default async function AllClassesPage() {
  const classes = await getclasses();
  //   console.log(await classes);
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
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search classes..."
            className="flex-1 px-4 py-2 bg-white dark:bg-[#2D2A24] border border-[#E8E0D8] dark:border-[#3A3530] rounded-lg font-['Inter'] text-sm text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] dark:placeholder-[#6B655A] focus:outline-none focus:border-[#D4845A] transition-colors"
          />
          <select className="px-4 py-2 bg-white dark:bg-[#2D2A24] border border-[#E8E0D8] dark:border-[#3A3530] rounded-lg font-['Inter'] text-sm text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none focus:border-[#D4845A] transition-colors">
            <option>All Categories</option>
            <option>Yoga</option>
            <option>HIIT</option>
            <option>Strength</option>
            <option>Pilates</option>
          </select>
        </div>

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
