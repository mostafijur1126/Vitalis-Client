import Banner from "@/components/home/Banner";
import CommunityBuzz from "@/components/home/CommunityBuzz";
import SuccessStories from "@/components/home/SuccessStories";
import WhyChoose from "@/components/home/WhyChoose";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <WhyChoose></WhyChoose>
      <CommunityBuzz></CommunityBuzz>
      <SuccessStories></SuccessStories>
    </div>
  );
}
