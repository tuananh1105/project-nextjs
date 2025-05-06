import instance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useUpdateStatusAddress = () => {
  const queryClient = useQueryClient();
  const updateStatusAddress = useMutation({
    mutationFn: async ({
      id,
      userId,
      isDefault,
    }: {
      id: string;
      userId: string;
      isDefault: boolean;
    }) => instance.put(`/editcustomer/${id}/${userId}`, { isDefault }),
    onSuccess: (result) => {
      toast("Cập nhật địa chỉ thành mặc định thành công!");
      queryClient.invalidateQueries({
        queryKey: ["ADDRESS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Cập nhật không thành công!");
    },
  });

  return { updateStatusAddress };
};

export default useUpdateStatusAddress;
