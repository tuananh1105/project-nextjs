import instance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useOrderMutation = () => {
  const queryClient = useQueryClient();
  const createOrder = useMutation({
    mutationFn: async (order: CreateCheckout) =>
      await instance.post("/orders", order),
    onSuccess: (result) => {
      toast.success("Đặt đơn hàng thành công!");
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Đặt đơn hàng không thành công!");
    },
  });

  const deleteFormCart = useMutation({
    mutationFn: async ({
      userId,
      variantIds,
    }: {
      userId: string;
      variantIds: string[];
    }) =>
      await instance.delete(`/cart/${userId}/product`, {
        data: { variantIds },
      }),
    onSuccess: (result) => {
      toast.success("Đã xoá sản phẩm khỏi giỏ hàng!");
      queryClient.invalidateQueries({
        queryKey: ["CARTS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Chưa xoá sản phẩm khỏi giỏ hàng!");
    },
  });

  return { createOrder, deleteFormCart };
};

export default useOrderMutation;
