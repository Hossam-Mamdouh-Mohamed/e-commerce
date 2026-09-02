import Image from "next/image";
import Products from "./_components/homePage/products/page";

export default function Home() {
  return (
    <>
      <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Products />
      </div>
    </>
  );
}
