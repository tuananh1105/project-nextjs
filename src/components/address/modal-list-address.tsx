import { FocusModal } from "@/components/ui/custom-focus-modal";
import { useFetchAddressByUserId } from "@/data/address/useFetchAddress";
import { getUserId } from "@/lib/get-userId";
import { AnimatePresence, motion } from "framer-motion";

const ModalListAddress = ({
  isOpen,
  isClose,
}: {
  isOpen: boolean;
  isClose: () => void;
}) => {
  const userId = getUserId();
  const { data: addresses, isLoading } = useFetchAddressByUserId(userId);

  if (isLoading) return <div>Loading...</div>;
  return (
    <AnimatePresence>
      {isOpen && (
        <FocusModal open={isOpen} onOpenChange={isClose}>
          <FocusModal.Content className="m-auto h-[550px] max-h-[90%] w-[calc(100%-24px)] max-w-[450px] overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 3, scale: 1 }}
              exit={{ opacity: 0, scale: 0.1 }}
              transition={{ duration: 0.1 }}
              className="bg-white rounded-xl w-full"
            >
              <FocusModal.Header>
                <FocusModal.Title>Danh sách địa chỉ</FocusModal.Title>
              </FocusModal.Header>
              <div>mà</div>
            </motion.div>
          </FocusModal.Content>
        </FocusModal>
      )}
    </AnimatePresence>
  );
};

export default ModalListAddress;
