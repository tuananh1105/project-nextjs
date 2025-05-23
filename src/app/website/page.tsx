"use client";

import Banner from "@/components/banner";
import ProductCart from "@/components/home/product-cart";

export default function Home() {
  return (
    <div className="bg-white">
      <Banner />
      <ProductCart />
    </div>
  );
}
