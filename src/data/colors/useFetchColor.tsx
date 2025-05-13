import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchColor = async (params: ColorParams) => {
  try {
    const res = await instance.get<{
      data: Color[];
      meta: MetaData;
    }>("/colors", { params });
    if (res.status !== 200) {
      throw new Error("Không có dữ liệu!");
    }
    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const useFetchColor = (params: ColorParams) => {
  return useQuery({
    queryKey: ["COLORS", params ?? {}],
    queryFn: () => fetchColor(params ?? {}),
    staleTime: 6 * 1000 * 60,
  });
};
