import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload";
import instance from "@/lib/axios-instance";

const { Dragger } = Upload;

type FileUploaderProps = {
  action: string;
  fieldName?: string;
  multiple?: boolean;
  headers?: Record<string, string>;
  onSuccess?: (res: Record<string, unknown>, file: UploadFile) => void;
  onError?: (error: Error, file: UploadFile) => void;
};

const FileUploader: React.FC<FileUploaderProps> = ({
  action,
  fieldName = "image",
  multiple = false,
  headers = {},
  onSuccess,
  onError,
}) => {
  const props: UploadProps = {
    name: fieldName,
    multiple,
    customRequest: async (options) => {
      const { file, onSuccess: successCb, onError: errorCb } = options;

      const formData = new FormData();

      const files = Array.isArray(file) ? file : [file];

      for (const f of files) {
        formData.append(fieldName, f as Blob);
      }

      try {
        const res = await instance.post(action, formData, {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status !== 200) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        message.success(`Upload thành công.`);
        successCb?.(res.data);
        onSuccess?.(res.data, file as UploadFile);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        console.error("Upload failed:", error);
        message.error(`Upload thất bại.`);
        errorCb?.(error);
        onError?.(error, file as UploadFile);
      }
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click hoặc kéo ảnh vào đây để upload</p>
      <p className="ant-upload-hint">
        Hỗ trợ upload 1 hoặc nhiều ảnh cùng lúc.
      </p>
    </Dragger>
  );
};

export default FileUploader;
