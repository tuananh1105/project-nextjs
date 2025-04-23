import { FocusModal } from "@/components/ui/custom-focus-modal";
import { TabsLayout } from "@/components/ui/tab-layouts";
import { AnimatePresence, motion } from "framer-motion";

const ModalSizeGuide = ({
  isOpen,
  isClose,
}: {
  isOpen: boolean;
  isClose: () => void;
}) => {
  const tabData = [
    {
      value: "nam",
      label: "Nam",
      name: "Áo Nam",
      image: "/images/quanlot.png",
    },
    {
      value: "nu",
      label: "Nữ",
      name: "Áo Nữ",
      image: "/images/nu.png",
    },
    {
      value: "treem",
      label: "Trẻ em",
      name: "Áo Trẻ Em",
      image: "/images/treem.png",
    },
    {
      value: "phukien",
      label: "Phụ Kiện",
      name: "Phụ kiện",
      image: "/images/phukien.png",
    },
  ];
  return (
    <AnimatePresence>
      {isOpen && (
        <FocusModal open={isOpen} onOpenChange={isClose}>
          <FocusModal.Content className="m-auto h-[800px] max-h-[90%] w-[calc(100%-24px)] max-w-[500px] overflow-visible">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 3, scale: 1 }}
              exit={{ opacity: 0, scale: 0.1 }}
              transition={{ duration: 0.1 }}
              className="bg-white rounded-xl shadow-lg w-full"
            >
              <FocusModal.Header>
                <FocusModal.Title>Bảng kích thước</FocusModal.Title>
              </FocusModal.Header>
              <div className="w-full px-4">
                <TabsLayout tabs={tabData} />
              </div>
            </motion.div>
          </FocusModal.Content>
        </FocusModal>
      )}
    </AnimatePresence>
  );
};

export default ModalSizeGuide;
