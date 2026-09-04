import Image from "next/image";
import Products from "./_components/products/products/page";
import Slider from "./_components/slider/page";
import image1 from '../assets/images/slider-image-1.jpeg'
import image2 from '../assets/images/slider-image-2.jpeg'
import image3 from '../assets/images/slider-image-3.jpeg'
import Categories from "./_components/categories/page";

export default function Home() {
  return (
    <>
      <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Slider spaceBetween={10} slidesPerView={1} pageList={[image1.src, image2.src, image3.src]} />
        <Categories />
        <Products />
      </div>
    </>
  );
}
