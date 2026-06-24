import ClassDetails from "@/components/ClassDetails";
import { getclassesById } from "@/lib/api/allClass";
import { auth } from "@/lib/auth";
import { getUserSession } from "@/lib/core/session";
import { headers } from "next/headers";
import React from "react";
import toast from "react-hot-toast";

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    toast.error("Authentication failed. Please login again.");
    return;
  }
  const classDetails = await getclassesById(id, token);
  const user = await getUserSession();

  let isBooked = false;
  let isFavorite = false;

  if (user?.id) {
    //booking check
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkBooking?userId=${user.id}&classId=${id}`,
    );
    const data = await res.json();
    isBooked = data.isBooked;

    //favorite check
    const favRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/favorites/check?userId=${user.id}&classId=${id}`,
    );
    const favData = await favRes.json();
    isFavorite = favData.isFavorite;
  }
  return (
    <div>
      <ClassDetails
        classData={classDetails}
        isBooked={isBooked}
        isFavorite={isFavorite}
        userId={user?.id}
        userName={user?.name}
        userEmail={user?.email}
      ></ClassDetails>
    </div>
  );
};

export default ClassDetailsPage;
