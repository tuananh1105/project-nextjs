import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchBlog = async (params: BlogParams) => {
  try {
    const res = await instance.get<{
      data: Blog[];
      meta: MetaData;
    }>("/posts", { params });
    if (res.status !== 200) {
      throw new Error("Không có dữ liệu!");
    }
    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const useFetchBlog = (params: BlogParams) => {
  return useQuery({
    queryKey: ["BLOGS", params],
    queryFn: () => fetchBlog(params),
    staleTime: 6 * 1000 * 60,
  });
};
