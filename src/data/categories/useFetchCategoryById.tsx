import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchCategoryById = async (productId: string) => {
  try {
    const res = await instance.get(`/categorys/${productId}`);
    if (res.status !== 200) {
      throw new Error("Không có dữ liệu!");
    }
    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const useFetchCategoryById = (productId: string) => {
  return useQuery({
    queryKey: ["CATEGORY", productId],
    queryFn: () => fetchCategoryById(productId),
    staleTime: 6 * 1000 * 60,
  });
};
