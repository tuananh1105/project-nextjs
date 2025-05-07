"use client";

import { FocusModal } from "@/components/ui/custom-focus-modal";
import useAddressMutation from "@/data/address/useAddressMutation";
import { useAdministrativeData } from "@/data/address/useFetchAddress";
import { getUserId } from "@/lib/get-userId";
import { Label } from "@medusajs/ui";
import { Button, Input, Select } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const ModalAddAddress = ({
  isOpen,
  isClose,
}: {
  isOpen: boolean;
  isClose: () => void;
}) => {
  const router = useRouter();
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("");
  const [, setSelectedWardId] = useState<string>("");
  const userId = getUserId();
  const { handleSubmit, control } = useForm<Address>({
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      district: "",
      ward: "",
      address: "",
      isDefault: false,
    },
  });

  const { createAddress } = useAddressMutation();

  const { data } = useAdministrativeData();

  const provinces = data || [];

  const districts = useMemo(() => {
    if (!selectedProvinceId) return [];
    const normalizedProvinceId = selectedProvinceId.padStart(2, "0");
    const province = provinces.find(
      (p: { Id: string }) => p.Id === normalizedProvinceId
    );
    return province?.Districts || [];
  }, [selectedProvinceId, provinces]);

  const wards = useMemo(() => {
    if (!selectedDistrictId) return [];
    const province = provinces.find(
      (p: { Id: string }) => p.Id === selectedProvinceId
    );
    const district = province?.Districts?.find(
      (d: { Id: string }) => d.Id === selectedDistrictId
    );
    return district?.Wards || [];
  }, [selectedDistrictId, selectedProvinceId, provinces]);

  const getNameById = (
    list: { Id: string; Name: string }[],
    id: string
  ): string => {
    return list.find((item) => item.Id === id)?.Name || "";
  };

  const onSubmit = async (formData: Address) => {
    const cityName = getNameById(provinces, formData.city);
    const districtName = getNameById(districts, formData.district);
    const wardName = getNameById(wards, formData.ward);
    await createAddress.mutateAsync({
      userId: userId,
      name: formData.name,
      phone: formData.phone,
      city: cityName,
      district: districtName,
      ward: wardName,
      address: formData.address,
    });
    router.push("/website/user/address");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusModal open={isOpen} onOpenChange={isClose}>
          <FocusModal.Content className="m-auto h-[370px] max-h-[90%] w-[calc(100%-24px)] max-w-[550px] overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 3, scale: 1 }}
              exit={{ opacity: 0, scale: 0.1 }}
              transition={{ duration: 0.1 }}
              className="bg-white rounded-xl w-full"
            >
              <FocusModal.Header>
                <FocusModal.Title>Thêm địa chỉ</FocusModal.Title>
              </FocusModal.Header>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap py-6 px-4 justify-between gap-y-5"
              >
                <div className="flex flex-col gap-1">
                  <Label className="text-[13px] text-gray-600">
                    <span className="text-red-500">*</span>Họ Tên
                  </Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        style={{ width: 250, height: 35 }}
                        placeholder="nhập họ tên"
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-[13px] text-gray-600">
                    <span className="text-red-500">*</span>Số Điện Thoại
                  </Label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        style={{ width: 250, height: 35 }}
                        placeholder="nhập số điện thoại"
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-[13px] text-gray-600">
                    <span className="text-red-500">*</span>Tỉnh/ Thành
                  </Label>
                  <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        showSearch
                        style={{ width: 250, height: 35 }}
                        placeholder="-- Chọn tỉnh/thành phố --"
                        optionFilterProp="label"
                        options={provinces.map(
                          (province: { Id: string; Name: string }) => ({
                            value: province.Id,
                            label: province.Name,
                          })
                        )}
                        onChange={(value) => {
                          field.onChange(value);
                          setSelectedProvinceId(value);
                          setSelectedDistrictId("");
                          setSelectedWardId("");
                        }}
                        value={field.value}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-[13px] text-gray-600">
                    <span className="text-red-500">*</span>Quận/ Huyện
                  </Label>
                  <Controller
                    name="district"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        showSearch
                        style={{ width: 250, height: 35 }}
                        placeholder="-- Chọn quận/huyện --"
                        optionFilterProp="label"
                        options={districts.map(
                          (district: { Id: string; Name: string }) => ({
                            value: district.Id,
                            label: district.Name,
                          })
                        )}
                        disabled={!selectedProvinceId}
                        onChange={(value) => {
                          field.onChange(value);
                          setSelectedDistrictId(value);
                          setSelectedWardId("");
                        }}
                        value={field.value}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-[13px] text-gray-600">
                    <span className="text-red-500">*</span>Xã/ Phường
                  </Label>
                  <Controller
                    name="ward"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        showSearch
                        style={{ width: 250, height: 35 }}
                        placeholder="-- Chọn xã/phường --"
                        optionFilterProp="label"
                        options={wards.map(
                          (ward: { Id: string; Name: string }) => ({
                            value: ward.Id,
                            label: ward.Name,
                          })
                        )}
                        disabled={!selectedDistrictId}
                        onChange={(value) => {
                          field.onChange(value);
                          setSelectedWardId(value);
                        }}
                        value={field.value}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-[13px] text-gray-600">
                    <span className="text-red-500">*</span>Địa Chỉ Cụ Thể
                  </Label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        style={{ width: 250, height: 35 }}
                        placeholder="nhập địa chỉ cụ thể"
                      />
                    )}
                  />
                </div>
                <Button
                  htmlType="submit"
                  className="ml-[407px]"
                  color="default"
                  variant="solid"
                >
                  Thêm địa chỉ
                </Button>
              </form>
            </motion.div>
          </FocusModal.Content>
        </FocusModal>
      )}
    </AnimatePresence>
  );
};

export default ModalAddAddress;
