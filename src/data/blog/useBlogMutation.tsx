import instance from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useBlogMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createBlog = useMutation({
    mutationFn: async (blog: CreateBlog) => {
      await instance.post("/posts", blog);
    },
    onSuccess: async (result) => {
      router.push("/admin/blogs");
      toast.success("Thêm tin tức thành công!");
      queryClient.invalidateQueries({
        queryKey: ["BLOGS"],
      });
      return result;
    },
  });

  const deleteBlog = useMutation({
    mutationFn: async (_id: string) => {
      await instance.delete(`/posts/${_id}`);
    },
    onSuccess: async (result) => {
      toast.success("Xoá tin tức thành công!");
      queryClient.invalidateQueries({
        queryKey: ["BLOGS"],
      });
      return result;
    },
    onError: (error: { response: { cart: { error_code: string } } }) => {
      console.log("error:", error);
      toast.error("Xoá tin tức không thành công!");
    },
  });

  return { createBlog, deleteBlog };
};

export default useBlogMutation;
