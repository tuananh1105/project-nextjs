import instance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useColorMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const createColor = useMutation({
    mutationFn: async (color: Color) => await instance.post("/colors", color),
    onSuccess: (result) => {
      router.push("/admin/colors");
      toast.success("Thêm màu mới thành công!");
      queryClient.invalidateQueries({
        queryKey: ["COLORS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Thêm màu sắc không thành công!");
    },
  });

  const deleteColor = useMutation({
    mutationFn: async (id: string) => await instance.delete(`/colors/${id}`),
    onSuccess: (result) => {
      toast.success("Xoá màu sắc thành công!");
      queryClient.invalidateQueries({
        queryKey: ["COLORS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Xoá màu sắc không thành công!");
    },
  });

  const editColor = useMutation({
    mutationFn: async ({ _id, color }: { _id: string; color: Color }) =>
      instance.put(`/colors/${_id}`, color),
    onSuccess: (result) => {
      router.push("/admin/colors");
      toast("Cập nhật màu sắc thành công!");
      queryClient.invalidateQueries({
        queryKey: ["COLORS"],
      });
      queryClient.invalidateQueries({
        queryKey: ["COLOR"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Cập nhật màu sắc không thành công!");
    },
  });

  return { createColor, deleteColor, editColor };
};

export default useColorMutation;
