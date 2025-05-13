import instance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useCategoryMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const createCategory = useMutation({
    mutationFn: async (category: Categories) => {
      return await instance.post("/categories", category);
    },
    onSuccess: async (result) => {
      router.push("/admin/categories");
      toast.success("Thêm danh mục thành công!");
      queryClient.invalidateQueries({
        queryKey: ["CATEGORIES"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Thêm danh mục không thành công!");
    },
  });

  const editCategory = useMutation({
    mutationFn: async ({
      category,
      id,
    }: {
      category: CategoriesEdit;
      id: string;
    }) => {
      return await instance.put(`/categorys/${id}`, category);
    },
    onSuccess: async (result) => {
      router.push("/admin/categories");
      toast.success("Cập nhật danh mục thành công!");
      queryClient.invalidateQueries({
        queryKey: ["CATEGORIES"],
      });
      queryClient.invalidateQueries({
        queryKey: ["CATEGORY"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Cập nhật danh mục không thành công!");
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (_id: string) => {
      return await instance.delete(`/categorys/${_id}`);
    },
    onSuccess: async (result) => {
      toast.success("Xoá danh mục thành công!");
      queryClient.invalidateQueries({
        queryKey: ["CATEGORIES"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Cập nhật danh mục không thành công!");
    },
  });

  return { createCategory, editCategory, deleteCategory };
};

export default useCategoryMutation;
