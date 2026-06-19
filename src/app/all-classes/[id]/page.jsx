import ClassDetails from "@/components/ClassDetails";
import { getclassesById } from "@/lib/api/allClass";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;
  const classDetails = await getclassesById(id);
  const user = await getUserSession();
  let isBooked = false;
  if (user?.id) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkBooking?userId=${user.id}&classId=${id}`,
    );
    const data = await res.json();
    isBooked = data.isBooked;
  }
  return (
    <div>
      <ClassDetails classData={classDetails} isBooked={isBooked}></ClassDetails>
    </div>
  );
};

export default ClassDetailsPage;
