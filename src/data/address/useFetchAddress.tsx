import instance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export const fetchAddressByUserId = async (userId: string) => {
  try {
    const res = await instance.get<{ data: Address[] }>(
      `/create-customer/${userId}`
    );
    if (res.status !== 200) {
      throw new Error("Không có dữ liệu!");
    }
    return res.data;
  } catch (error) {
    console.error("fetchAddressByUserId error:", error);
    throw error;
  }
};

export const useFetchAddressByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["ADDRESS", userId],
    queryFn: () => fetchAddressByUserId(userId),
    staleTime: 6 * 1000 * 60,
    enabled: !!userId,
  });
};

export const fetchAdministrativeData = async () => {
  const res = await instance.get(
    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
  );

  if (res.status !== 200) {
    throw new Error("Không có dữ liệu");
  }
  return res.data;
};

export const useAdministrativeData = () => {
  return useQuery({
    queryKey: ["administrative-data"],
    queryFn: fetchAdministrativeData,
    staleTime: 1000 * 60 * 60,
  });
};

export const fetchAddressById = async (userId: string) => {
  try {
    const res = await instance.get<{ data: Address }>(`/customers/${userId}`);
    if (res.status !== 200) {
      throw new Error("Không có dữ liệu!");
    }
    return res.data;
  } catch (error) {
    console.error("fetchAddressByUserId error:", error);
    throw error;
  }
};

export const useFetchAddressById = (userId: string) => {
  return useQuery({
    queryKey: ["ADDRESSES", userId],
    queryFn: () => fetchAddressById(userId),
    staleTime: 6 * 1000 * 60,
    enabled: !!userId,
  });
};
