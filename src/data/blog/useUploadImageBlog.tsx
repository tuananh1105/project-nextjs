import instance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useUploadImageBlog = () => {
  const uploadThumbnailBlog = useMutation({
    mutationFn: (data: FormData) => {
      return instance.post<{ data: string }>("/upload-thumbnail-blog", data);
    },

    onSuccess: (result) => {
      return result.data;
    },

    onError: () => {
      toast.error("Upload ảnh không thành công!");
    },
  });

  return { uploadThumbnailBlog };
};

export default useUploadImageBlog;
