import { useFetchAddressByUserId } from "@/data/address/useFetchAddress";
import useUpdateStatusAddress from "@/data/address/useUpdateStatusAddress";
import { getUserId } from "@/lib/get-userId";

const ModalContentAddress = () => {
  const userId = getUserId();
  const { updateStatusAddress } = useUpdateStatusAddress();

  const { data: addresses, isLoading } = useFetchAddressByUserId(userId);

  const handleUpdateStatusAddress = async (addressId: string) => {
    if (!addressId) {
      console.error("Không tìm thấy địa chỉ hợp lệ");
      return;
    }
    await updateStatusAddress.mutateAsync({
      id: addressId,
      userId: userId,
      isDefault: true,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mb-1 justify-start rounded-lg  sm:space-x-0 h-[350px] overflow-y-scroll scrollbar-hide">
      {addresses?.data.map((address, index) => (
        <>
          <div className="flex justify-between" key={index}>
            <div>
              <h1 className="mt-1 flex flex-col text-lg">
                {address.name} <p className="text-[16px]"> {address.phone}</p>
              </h1>
              <h1 className="text-sm">{address.address}</h1>
              <h1 className="mb-2">
                {address.ward}, {address.district}, {address.city}
              </h1>

              {address.isDefault === true ? (
                <div className="w-[80px] border-[1px] border-[#ee4d2d] px-2 py-1 text-center text-sm text-[#ee4d2d]">
                  Mặc định
                </div>
              ) : null}
            </div>
            <div className="mt-2 flex flex-col items-center">
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
            <div className="border-b mt-4 border-gray-300"></div>
          ) : null}
        </>
      ))}
    </div>
  );
};

export default ModalContentAddress;
