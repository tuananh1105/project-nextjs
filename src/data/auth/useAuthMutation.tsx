import instance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAuthMutation = () => {
  const signup = useMutation({
    mutationFn: async (user: Register) => {
      try {
        const res = await instance.post<Register>("/signup", user);
        return res.data;
      } catch (error) {
        throw new Error("Đã xảy ra lỗi", { cause: error });
      }
    },
    onSuccess: async () => {
      toast.success("Đăng ký thành công!");
    },
  });

  const login = useMutation({
    mutationFn: async (user: Login) => {
      try {
        const res = await instance.post<Login>("/signin", user);
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      } catch (error) {
        throw new Error("Đã xảy ra lỗi", { cause: error });
      }
    },
    onSuccess: async () => {
      toast.success("Đăng nhập thành công!");
    },
  });

  return { signup, login };
};

export default useAuthMutation;
