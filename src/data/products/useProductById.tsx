import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchProductById = async (id: string) => {
  try {
    const res = await instance.get<{ data: Product }>(`/products/${id}`);
    if (res.status !== 200) {
      throw new Error("Không có dữ liệu!");
    }
    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const useFetchProductById = (id: string) => {
  return useQuery({
    queryKey: ["CARTS", id],
    queryFn: () => fetchProductById(id),
    staleTime: 6 * 1000 * 60,
  });
};
