"use client";
import ModalContent from "@/components/modal-content";
import CustomModal from "@/components/ui/custom-modal-ant";
import { Button } from "antd";
import { useState } from "react";

const Test: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => setOpen(true);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" className="ml-96" onClick={showModal}>
        Mở Modal dùng chung
      </Button>
      <CustomModal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        title="Danh sách địa chỉ"
        content={<ModalContent />}
      />
    </>
  );
};

export default Test;
