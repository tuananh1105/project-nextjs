import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchAllUser = async () => {
  try {
    const res = await instance.get("/users");
    if (res.status !== 200) {
      throw new Error("Không có dữ liệu!");
    }
    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const useFetchAllUser = () => {
  return useQuery({
    queryKey: ["USERS"],
    queryFn: () => fetchAllUser(),
    staleTime: 6 * 1000 * 60,
  });
};
