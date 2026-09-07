import Image from "next/image";
import ProductsSection from "@/components/home/ProductsSection";
import HeroSlider from "@/components/home/HeroSlider";
import image1 from '../assets/images/slider-image-1.jpeg'
import image2 from '../assets/images/slider-image-2.jpeg'
import image3 from '../assets/images/slider-image-3.jpeg'
import CategoriesSection from "@/components/home/CategoriesSection";
import HomeFeatures from "@/components/home/HomeFeatures";

export default function Home() {
  return (
    <>
      <div>
        <HeroSlider spaceBetween={10} slidesPerView={1} pageList={[image1.src, image2.src, image3.src]} />
        <HomeFeatures />
        <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CategoriesSection />
          <ProductsSection />
        </div>
      </div>
    </>
  );
}
