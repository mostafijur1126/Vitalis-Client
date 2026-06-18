import ClassDetails from "@/components/ClassDetails";
import { getclassesById } from "@/lib/api/allClass";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const ClassDetailsPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  //   console.log(id);
  const classDetails = await getclassesById(id);
  //   console.log(classDetails);
  return (
    <div>
      <ClassDetails classData={classDetails}></ClassDetails>
    </div>
  );
};

export default ClassDetailsPage;
