const ModalContent = () => {
  return (
    <div className="mb-1 justify-start rounded-lg  sm:space-x-0">
      <div className="flex justify-between ">
        <div>
          <h1 className="mt-1 flex flex-col text-lg">
            Tuấn anh <p className="text-[16px]"> 0335039614</p>
          </h1>
          <h1 className="text-sm">Khôn thôn</h1>
          <h1 className="mb-2">Minh cường, thường tín, hà nội</h1>

          <div className="w-[80px] border-[1px] border-[#ee4d2d] px-2 py-1 text-center text-sm text-[#ee4d2d]">
            Mặc định
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center">
          <p className="mt-3 cursor-pointer border p-2 text-black">
            Thiết Lập Là Mặc Định
          </p>
        </div>
      </div>
      <div className="border-b mt-4 border-gray-300"></div>
      <div className="flex justify-between">
        <div>
          <h1 className="mt-1 flex flex-col text-lg">
            Tuấn anh <p className="text-[16px]"> 0335039614</p>
          </h1>
          <h1 className="text-sm">Khôn thôn</h1>
          <h1 className="mb-2">Minh cường, thường tín, hà nội</h1>

          <div className="w-[80px] border-[1px] border-[#ee4d2d] px-2 py-1 text-center text-sm text-[#ee4d2d]">
            Mặc định
          </div>
        </div>
        <div className="mt-2 flex flex-col items-center">
          <p className="mt-3 cursor-pointer border border-gray-300 p-2 text-black">
            Thiết Lập Là Mặc Định
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
