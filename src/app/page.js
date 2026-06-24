import Banner from "@/components/home/Banner";
import CommunityBuzz from "@/components/home/CommunityBuzz";
import FeaturedClasses from "@/components/home/FeaturedClasses";
import SuccessStories from "@/components/home/SuccessStories";
import WhyChoose from "@/components/home/WhyChoose";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <FeaturedClasses></FeaturedClasses>
      <WhyChoose></WhyChoose>
      <CommunityBuzz></CommunityBuzz>
      <SuccessStories></SuccessStories>
    </div>
  );
}
