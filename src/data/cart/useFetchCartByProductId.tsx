import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchCartByProductId = async ({
  userId,
  variantId,
}: {
  userId: string;
  variantId: string;
}) => {
  try {
    const res = await instance.get<CartByProductId>(
      `/cart/${userId}/product/${variantId}`
    );
    if (res.status !== 200) {
      throw new Error("Không có dữ liệu!");
    }
    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const useFetchCartByProductId = ({
  userId,
  variantId,
}: {
  userId: string;
  variantId: string;
}) => {
  return useQuery({
    queryKey: ["CART"],
    queryFn: () => fetchCartByProductId({ userId, variantId }),
    staleTime: 6 * 1000 * 60,
  });
};
