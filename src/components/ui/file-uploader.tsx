import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

interface FileUploaderProps {
  actionUrl?: string;
  multiple?: boolean;
  uploadText?: string;
  uploadHint?: string;
  onChange?: UploadProps["onChange"];
  onDrop?: UploadProps["onDrop"];
}

const FileUploader: React.FC<FileUploaderProps> = ({
  actionUrl = "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  multiple = true,
  uploadText = "Click or drag file to this area to upload",
  uploadHint = "Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.",
  onChange,
  onDrop,
}) => {
  const uploadProps: UploadProps = {
    name: "file",
    multiple,
    action: actionUrl,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      onChange?.(info);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
      onDrop?.(e);
    },
  };

  return (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{uploadText}</p>
      <p className="ant-upload-hint">{uploadHint}</p>
    </Dragger>
  );
};

export default FileUploader;
