import instance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useSizeMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const createSize = useMutation({
    mutationFn: async (size: Size) => await instance.post("/sizes", size),
    onSuccess: (result) => {
      router.push("/admin/sizes");
      toast.success("Thêm Size thành công!");
      queryClient.invalidateQueries({
        queryKey: ["SIZES"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Thêm size không thành công!");
    },
  });

  const deleteSize = useMutation({
    mutationFn: async (id: string) => await instance.delete(`/sizes/${id}`),
    onSuccess: (result) => {
      toast.success("Xoá kích thước thành công!");
      queryClient.invalidateQueries({
        queryKey: ["SIZES"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Xoá kích thước không thành công!");
    },
  });

  const editSize = useMutation({
    mutationFn: async ({ _id, size }: { _id: string; size: Size }) =>
      instance.put(`/sizes/${_id}`, size),
    onSuccess: (result) => {
      router.push("/admin/sizes");
      toast.success("Cập nhật size thành công!");
      queryClient.invalidateQueries({
        queryKey: ["SIZES"],
      });
      queryClient.invalidateQueries({
        queryKey: ["SIZE"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Cập nhật size không thành công!");
    },
  });

  return { createSize, deleteSize, editSize };
};

export default useSizeMutation;
