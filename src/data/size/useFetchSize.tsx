import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchSize = async (params: SizeParams) => {
  try {
    const res = await instance.get<{
      data: Size[];
      meta: MetaData;
    }>("/sizes", { params });
    if (res.status !== 200) {
      throw new Error("không có dữ liệu!");
    }
    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const useFetchSize = (params: SizeParams) => {
  return useQuery({
    queryKey: ["SIZES", params ?? {}],
    queryFn: () => fetchSize(params ?? {}),
    staleTime: 6 * 1000 * 60,
  });
};
