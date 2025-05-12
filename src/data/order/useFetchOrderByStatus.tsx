import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchOrderByStatus = async ({
  status,
  params,
}: {
  status: string;
  params: OrderParams;
}) => {
  try {
    const res = await instance.get("/orders/by-status", {
      params: {
        status,
        ...params,
      },
    });
    if (res.status !== 200) {
      throw new Error("Không có dữ liệu!");
    }
    return res.data;
  } catch (error) {
    console.log("error:", error);
  }
};

export const useFetchOrderByStatus = ({
  status,
  params,
}: {
  status: string;
  params: OrderParams;
}) => {
  return useQuery({
    queryKey: ["ORDERS", status, params],
    queryFn: () => fetchOrderByStatus({ status, params }),
    enabled: !!status,
  });
};
