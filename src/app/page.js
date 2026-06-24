import Banner from "@/components/home/Banner";
import CommunityBuzz from "@/components/home/CommunityBuzz";
import FeaturedClasses from "@/components/home/FeaturedClasses";
import LatestPost from "@/components/home/LatestPost";
import SuccessStories from "@/components/home/SuccessStories";
import WhyChoose from "@/components/home/WhyChoose";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <FeaturedClasses></FeaturedClasses>
      <WhyChoose></WhyChoose>
      <LatestPost></LatestPost>
      <CommunityBuzz></CommunityBuzz>
      <SuccessStories></SuccessStories>
    </div>
  );
}
