import { FocusModal } from "@/components/ui/custom-focus-modal";
import { AnimatePresence, motion } from "framer-motion";
import { Trash } from "../ui/icon";

const ModalDeleteCart = ({
  isOpen,
  isClose,
  handleDeleteCartById,
}: {
  isOpen: boolean;
  isClose: () => void;
  handleDeleteCartById: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <FocusModal open={isOpen} onOpenChange={isClose}>
          <FocusModal.Content className="m-auto h-[250px] max-h-[90%] w-[calc(100%-24px)] max-w-[450px] overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 3, scale: 1 }}
              exit={{ opacity: 0, scale: 0.1 }}
              transition={{ duration: 0.1 }}
              className="bg-white rounded-xl w-full"
            >
              <FocusModal.Header>
                <FocusModal.Title>Xoá sản phẩm</FocusModal.Title>
              </FocusModal.Header>
              <div className="w-full px-4 flex flex-col justify-center items-center mt-5">
                <p className="text-red-500">
                  <Trash />
                </p>
                <p className="text-[15px] text-gray-600 mt-5 ">
                  Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?
                </p>
              </div>
              <div className="border-b mt-6 text-gray-300"></div>
              <div className="px-4 flex gap-3 justify-center mt-5">
                <button className="border-[1px] text-[15px] border-gray-300 rounded-full px-20 py-2 hover:bg-gray-200">
                  Không
                </button>
                <button
                  onClick={() => handleDeleteCartById()}
                  className="text-[15px] cursor-pointer text-[#FF7676] bg-red-50 hover:bg-red-200 rounded-full px-20 py-2"
                >
                  Xoá
                </button>
              </div>
            </motion.div>
          </FocusModal.Content>
        </FocusModal>
      )}
    </AnimatePresence>
  );
};

export default ModalDeleteCart;
