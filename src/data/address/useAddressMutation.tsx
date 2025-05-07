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

  const createAddress = useMutation({
    mutationFn: async ({
      userId,
      name,
      phone,
      city,
      district,
      ward,
      address,
    }: {
      userId: string;
      name: string;
      phone: string;
      city: string;
      district: string;
      ward: string;
      address: string;
    }) =>
      instance.post("create-customer", {
        userId,
        address,
        city,
        district,
        name,
        phone,
        ward,
      }),
    onSuccess: (result) => {
      toast("Thêm địa chỉ thành công!");
      queryClient.invalidateQueries({
        queryKey: ["ADDRESS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Thêm địa chỉ không thành công!");
    },
  });
  return { deleteAddress, createAddress };
};

export default useAddressMutation;
