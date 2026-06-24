import { getFeaturedClass } from "@/lib/api/allClass";
import React from "react";

const FeaturedClasses = async () => {
  const data = await getFeaturedClass();
  console.log(data);
  return <div>FeaturedClasses</div>;
};

export default FeaturedClasses;
