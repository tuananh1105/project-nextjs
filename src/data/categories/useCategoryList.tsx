import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchCategory = async () => {
  try {
    const res = await instance.get<Categories>("/categories");
    if (res.status !== 200) {
      throw new Error("Không có dữ liệu!");
    }
    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const useFetchCategory = () => {
  return useQuery({
    queryKey: ["CATEGORIES"],
    queryFn: () => fetchCategory(),
    staleTime: 6 * 1000 * 60,
  });
};
