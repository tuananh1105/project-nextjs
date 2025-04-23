import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchFindOneProduct = async (slug: string) => {
  try {
    const res = await instance.get<{ product: Product }>(
      `/products/slug/${slug}`
    );
    if (res.status !== 200) {
      throw new Error("Lỗi khi lấy sản phẩm!");
    }

    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const useFetchDetailProduct = (slug: string) => {
  const isValidSlug = !!slug && slug !== "undefined";
  return useQuery({
    queryKey: ["PRODUCTS", slug],
    queryFn: () => fetchFindOneProduct(slug),
    enabled: isValidSlug,
    staleTime: 5 * 1000 * 60,
  });
};
