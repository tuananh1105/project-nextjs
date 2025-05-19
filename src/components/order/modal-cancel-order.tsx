import useOrderMutation from "@/data/order/useOrderMutation";
import { Label } from "@medusajs/ui";
import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

type ModalCancelOrderProps = {
  orderId: string;
  isOpen: boolean;
  isClose: () => void;
};

const ModalCancelOrder: React.FC<ModalCancelOrderProps> = ({
  isOpen,
  isClose,
  orderId,
}) => {
  const [reason, setReason] = useState("");
  const { updateCancelStatus } = useOrderMutation();
  const handleOk = async () => {
    await updateCancelStatus.mutateAsync({
      orderId,
      reason,
    });
    isClose();
    setReason("");
  };

  return (
    <Modal
      title="Hủy đơn hàng"
      open={isOpen}
      onOk={handleOk}
      onCancel={() => {
        isClose();
        setReason("");
      }}
      closable={true}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <Label>
        <span className="text-red-400">*</span>Lí do huỷ đơn
      </Label>
      <TextArea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        cols={4}
        rows={5}
        placeholder="Nhập lí do huỷ"
      />
    </Modal>
  );
};

export default ModalCancelOrder;
