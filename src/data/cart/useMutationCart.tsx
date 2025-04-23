import instance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCartMutation = () => {
  const queryClient = useQueryClient();
  const createCart = useMutation({
    mutationFn: async (cart: Cart) => {
      return await instance.post("/cart/add-to-cart", cart);
    },
    onSuccess: async (result) => {
      toast("Đã thêm vào giỏ hàng thành công!");
      await queryClient.invalidateQueries({
        queryKey: ["CARTS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast("Thêm vào giỏ hàng không thành công!");
    },
  });

  const deleteCart = useMutation({
    mutationFn: ({
      userId,
      variantIds,
    }: {
      userId: string;
      variantIds: string[];
    }) => instance.delete(`/cart/${userId}/product`, { data: { variantIds } }),
    onSuccess: (result) => {
      toast("Đã xoá sản phẩm khỏi giỏ hàng!");
      queryClient.invalidateQueries({
        queryKey: ["CARTS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast("Xoá giỏ hàng không thành công!");
    },
  });

  return { createCart, deleteCart };
};

export default useCartMutation;
