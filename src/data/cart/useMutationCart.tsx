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
      toast.error("Thêm vào giỏ hàng không thành công!");
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
      toast.error("Xoá giỏ hàng không thành công!");
    },
  });

  const increaseQuantity = useMutation({
    mutationFn: ({
      userId,
      variantId,
      productId,
    }: {
      userId: string;
      variantId: string;
      productId: string;
    }) =>
      instance.patch("/cart/increase-quantity", {
        userId,
        variantId,
        productId,
      }),
    onSuccess: (result) => {
      toast("Đã tăng số lượng sản phẩm!");
      queryClient.invalidateQueries({
        queryKey: ["CARTS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Tăng số lượng sản phẩm không thành công!");
    },
  });

  const decreaseQuantity = useMutation({
    mutationFn: ({
      userId,
      variantId,
      productId,
    }: {
      userId: string;
      variantId: string;
      productId: string;
    }) =>
      instance.patch("/cart/decrease-quantity", {
        userId,
        variantId,
        productId,
      }),
    onSuccess: (result) => {
      toast("Đã giảm số lượng sản phẩm!");
      queryClient.invalidateQueries({
        queryKey: ["CARTS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Giảm số lượng sản phẩm không thành công!");
    },
  });

  return { createCart, deleteCart, increaseQuantity, decreaseQuantity };
};

export default useCartMutation;
