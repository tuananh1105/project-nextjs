import instance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCartMutation = () => {
  const createCart = useMutation({
    mutationFn: async (cart: Cart) => {
      return await instance.post("/cart/add-to-cart", cart);
    },
    onSuccess: async (result) => {
      toast("Đã thêm vào giỏ hàng thành công!");
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast("Thêm vào giỏ hàng không thành công!");
    },
  });

  return { createCart };
};

export default useCartMutation;
