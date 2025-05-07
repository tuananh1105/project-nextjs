"use client";

import ModalAddAddress from "@/components/address/modal-add-address";
import ModalDeleteAddress from "@/components/address/modal-delete-address";
import useAddressMutation from "@/data/address/useAddressMutation";
import { useFetchAddressByUserId } from "@/data/address/useFetchAddress";
import useUpdateStatusAddress from "@/data/address/useUpdateStatusAddress";
import { getUserId } from "@/lib/get-userId";
import { Button } from "antd";
import { useState } from "react";

export default function AddressList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const userId = getUserId();

  const { data: addresses, isLoading } = useFetchAddressByUserId(userId);

  const { updateStatusAddress } = useUpdateStatusAddress();
  const { deleteAddress } = useAddressMutation();

  const handleUpdateStatusAddress = async (addressId: string) => {
    if (!addressId) {
      console.error("Không tìm thấy địa chỉ hợp lệ");
      return;
    }
    await updateStatusAddress.mutateAsync({
      id: addressId!,
      userId: userId!,
      isDefault: true,
    });
  };

  const hanleDeleteAddress = async (addressId: string) => {
    await deleteAddress.mutate(addressId);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModalAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModalAdd = () => {
    setIsAddModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="bg-white p-6 border-b border-gray-300 flex justify-between">
        <p className="text-xl">Địa chỉ của tôi</p>
        <Button onClick={handleOpenModalAdd}>Thêm địa chỉ mới</Button>
        <ModalAddAddress
          isOpen={isAddModalOpen}
          isClose={handleCloseModalAdd}
        />
      </div>
      <div className="bg-white p-6">
        <p className="text-xl">Địa chỉ</p>
        {addresses?.data?.map((address: Address, index) => (
          <>
            <div className="mt-4">
              <div className="flex justify-between">
                <div key={address._id ?? index}>
                  <p>
                    {address.name}
                    <span className="text-xl text-gray-500 ml-1">|</span>
                    <span className="text-sm text-gray-500 ml-1">
                      {address.phone}
                    </span>
                  </p>
                  <span className="text-sm text-gray-500">
                    {address.address}
                    <br /> {address.ward}, {address.district}, {address.city}
                  </span>
                  {address.isDefault === true ? (
                    <p className="border w-20 text-center border-red-400 text-red-400 text-sm mt-2">
                      Mặc định
                    </p>
                  ) : null}
                </div>
                <div>
                  <div className="flex gap-3 justify-end">
                    <p className="text-[15px] text-[#0097FF]">Cập nhật</p>
                    {address.isDefault === false ? (
                      <>
                        <p
                          onClick={handleOpenModal}
                          className="text-[15px] text-red-400 cursor-pointer"
                        >
                          Xoá
                        </p>
                        <ModalDeleteAddress
                          isOpen={isModalOpen}
                          isClose={handleCloseModal}
                          handleDeleteAddressById={() =>
                            hanleDeleteAddress(address._id)
                          }
                        />
                      </>
                    ) : null}
                  </div>

                  <p
                    onClick={() => {
                      if (address.isDefault === false) {
                        handleUpdateStatusAddress(address._id);
                      }
                    }}
                    className={`text-[15px] border px-[14px] py-1 mt-3 ${
                      address.isDefault
                        ? "cursor-not-allowed border-gray-300 text-gray-400"
                        : "cursor-pointer border-gray-300"
                    }`}
                  >
                    Thiết lập là mặc định
                  </p>
                </div>
              </div>
              {index !== addresses.data.length - 1 ? (
                <div className="border-b mt-5 border-gray-300"></div>
              ) : null}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
