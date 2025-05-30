import instance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useAuthMutation = () => {
  const router = useRouter();
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
      router.push("/website/login");
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
      router.push("/website");
    },
  });

  return { signup, login };
};

export default useAuthMutation;
