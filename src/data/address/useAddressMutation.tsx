import instance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAddressMutation = () => {
  const queryClient = useQueryClient();
  const deleteAddress = useMutation({
    mutationFn: async (id: string) => instance.delete(`/delete-customer/${id}`),
    onSuccess: (result) => {
      toast("Xoá địa chỉ thành công!");
      queryClient.invalidateQueries({
        queryKey: ["ADDRESS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Xoá địa chỉ không thành công!");
    },
  });
  return { deleteAddress };
};

export default useAddressMutation;
