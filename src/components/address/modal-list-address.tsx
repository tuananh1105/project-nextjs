import React from "react";
import { Modal } from "antd";

type CustomModalProps = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  title?: string;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
};

const ModalListAddress: React.FC<CustomModalProps> = ({
  open,
  onOk,
  onCancel,
  confirmLoading = false,
  title = "Thông báo",
  content,
  okText = "OK",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      okText={okText}
      cancelText={cancelText}
    >
      {content}
    </Modal>
  );
};

export default ModalListAddress;
