import { useFetchProduct } from "@/data/products/useProductList";
import CurrencyVND from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";

const PAGESIZE = 10;

const ProductCart = () => {
  const {
    data: listProduct,
    error,
    isLoading,
  } = useFetchProduct({
    page: 1,
    limit: PAGESIZE,
  });

  if (isLoading) return <div>...Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <div className="max-w-[1200px] m-auto grid grid-cols-4 gap-y-10">
      {listProduct?.data.map((product) => (
        <div className="flex" key={product._id}>
          <div className="group block">
            <div className="">
              <Image
                src={product.image}
                alt=""
                width={300}
                height={500}
                className="object-cover border-[1px] border-gray-400 rounded-lg w-64 h-96 "
              />
            </div>

            <div className="mt-1.5">
              <p className="text-xs text-gray-500">{product.category.name}</p>

              <div className="mt-1.5 flex gap-1">
                <div className="mt-2 flex items-center">
                  {[
                    ...new Set(
                      product.variants.map((variant) => variant.color)
                    ),
                  ]
                    .slice(0, 4)
                    .map((color, index) => (
                      <div
                        key={index}
                        className="h-4 w-4 cursor-pointer rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}

                  {new Set(product.variants.map((variant) => variant.color))
                    .size > 4 && (
                    <span className="text-sm font-semibold text-gray-600">
                      +
                      {new Set(product.variants.map((variant) => variant.color))
                        .size - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
                  <Link href={`website/product/${product.slug}`}>
                    {product.name}
                  </Link>
                </h3>

                <p className="text-gray-900">
                  <CurrencyVND amount={product.price} />
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCart;
