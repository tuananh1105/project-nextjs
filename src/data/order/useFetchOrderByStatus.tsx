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

export const fetchOrderByUserId = async ({
  userId,
  status,
  params,
}: {
  userId: string;
  status: string;
  params: OrderParams;
}) => {
  try {
    const res = await instance.get(`/orders/by-status-user/${userId}`, {
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

export const useFetchOrderByUserId = ({
  userId,
  status,
  params,
}: {
  userId: string;
  status: string;
  params: OrderParams;
}) => {
  return useQuery({
    queryKey: ["ORDER", userId, status, params],
    queryFn: () => fetchOrderByUserId({ userId, status, params }),
    enabled: !!userId && !!status,
    staleTime: 1000 * 60 * 5,
  });
};

export const fetchOrderCountByStatus = async (
  status?: string
): Promise<number[]> => {
  try {
    const res = await instance.get("/order-all", {
      params: status ? { status } : {},
    });

    if (res.status !== 200 || !Array.isArray(res.data)) {
      throw new Error("Không có dữ liệu!");
    }

    return res.data;
  } catch (error) {
    console.error("Lỗi fetchOrdersByStatus:", error);
    return [];
  }
};

export const useOrderCountByStatus = (status?: string) => {
  return useQuery({
    queryKey: ["ORDER_COUNT", status],
    queryFn: () => fetchOrderCountByStatus(status),
    enabled: true,
  });
};
