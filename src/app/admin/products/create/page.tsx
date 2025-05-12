"use client";

import FileUploader from "@/components/ui/file-uploader";
import { Label } from "@medusajs/ui";
import { Input, UploadFile } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateProduct() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const { handleSubmit, control, setValue } = useForm<CreateBlog>({
    defaultValues: {
      title: "",
      author: "",
      description: "",
    },
  });

  const handleSuccess = (res: unknown) => {
    console.log("Dữ liệu trả về từ server:", res);

    const url = res as string;

    if (typeof url === "string" && url.startsWith("http")) {
      setFileUrl(url);
      toast("Upload thành công!", { autoClose: 3000 });
      console.log("URL đã được lưu:", url);
    } else {
      toast.error("URL không hợp lệ", { autoClose: 3000 });
    }
  };

  const handleError = (error: Error, file: UploadFile) => {
    console.log("Upload thất bại:", error, file);
    toast.error("Upload thất bại", { autoClose: 3000 });
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Thêm mới sản phẩm</h1>
      <div className="bg-white p-6 rounded-lg">
        <form>
          <div className="flex justify-between gap-5">
            <div className="max-w-full w-full">
              <Label>
                <span className="text-red-500">*</span>Name
              </Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="nhập tên sản phẩm" />
                )}
              />
            </div>
            <div className="max-w-full w-full">
              <Label>
                <span className="text-red-500">*</span>Giá
              </Label>
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="nhập giá sản phẩm" />
                )}
              />
            </div>
          </div>
        </form>
        {/* <FileUploader
          action="/upload-thumbnail-product"
          fieldName="image"
          multiple
          onSuccess={handleSuccess}
          onError={handleError}
        />
        {fileUrl && (
          <div>
            <p>
              URL của file đã upload:{" "}
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                {fileUrl}
              </a>
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
}
