import instance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useProductMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: async (product: ProductCreate) =>
      await instance.post("/products", product),
    onSuccess: (result) => {
      router.push("/admin/products");
      toast.success("Thêm sản phẩm thành công!");
      queryClient.invalidateQueries({
        queryKey: ["PRODUCTS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Thêm sản phẩm không thành công!");
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => await instance.delete(`/products/${id}`),
    onSuccess: (result) => {
      toast.success("Xoá sản phẩm thành công");
      queryClient.invalidateQueries({
        queryKey: ["PRODUCTS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Xoá sản phẩm không thành công!");
    },
  });

  return { createProduct, deleteProduct };
};

export default useProductMutation;
