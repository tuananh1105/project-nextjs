import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchCart = async (userId: string) => {
  try {
    const res = await instance.get<Cart>(`/cart/${userId}`);
    if (res.status !== 200) {
      throw new Error("Lỗi khi tải giỏ hàng!");
    }
    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const useFetchCart = (userId: string) => {
  return useQuery({
    queryKey: ["CARTS", userId],
    queryFn: () => fetchCart(userId),
    staleTime: 5 * 1000 * 60,
  });
};
