import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchProduct = async (params: ProductParams) => {
  try {
    const res = await instance.get<{
      data: Product[];
      meta: MetaData;
    }>("/product", { params });

    if (res.status !== 200) {
      throw new Error("Lỗi khi tải sản phẩm");
    }

    return res.data;
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
};

export const useFetchProduct = (params: ProductParams) => {
  return useQuery({
    queryKey: ["PRODUCTS", params ?? {}],
    queryFn: () => fetchProduct(params ?? {}),
    enabled: !!params,
    staleTime: 5 * 1000 * 60,
  });
};
