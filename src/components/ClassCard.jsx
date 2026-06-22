import { getUserSession } from "@/lib/core/session";
import Image from "next/image";
import Link from "next/link";

export default async function ClassCard({ cls }) {
  const user = await getUserSession();
  // console.log(user);
  // console.log(cls);
  const { className, price, author, duration, slot, classImage } = cls;
  return (
    <div className="bg-white dark:bg-[#2D2A24] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E8E0D8] dark:border-[#3A3530] flex flex-col">
      {/* Image placeholder */}
      <div className="h-48 bg-[#F5EDE6] dark:bg-[#3A3530] relative">
        <Image
          src={classImage}
          alt={className}
          height={400}
          width={550}
          unoptimized
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-['Inter'] text-lg font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
          {className}
        </h3>

        <div className="mt-1 flex items-center justify-between">
          <span className="font-['Inter'] text-xl font-bold text-[#D4845A]">
            ${price}
          </span>
          <span className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
            {author}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-4 text-sm font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6]">
          <span>{duration}</span>
          <span>•</span>
          <span>📋 {slot} Booked</span>
        </div>

        <Link href={`/all-classes/${cls._id}`}>
          <button className="mt-4 w-full py-2 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
