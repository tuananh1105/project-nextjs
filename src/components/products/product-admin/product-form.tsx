"use client";

import FileUploader from "@/components/ui/file-uploader";
import { useFetchCategory } from "@/data/categories/useCategoryList";
import { Label } from "@medusajs/ui";
import { Editor } from "@tinymce/tinymce-react";
import { Input, Select, UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

type ProductFormProps = {
  onFileUrlChange: (url: string) => void;
};
export default function ProductForm({ onFileUrlChange }: ProductFormProps) {
  const { control } = useFormContext<ProductCreate>();

  const [pagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data: categoryList } = useFetchCategory({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const handleSuccess = (res: unknown) => {
    const url = res as string;

    if (typeof url === "string" && url.startsWith("http")) {
      onFileUrlChange(url);
      toast("Upload thành công!", { autoClose: 3000 });
    } else {
      toast.error("URL không hợp lệ", { autoClose: 3000 });
    }
  };

  const handleError = (error: Error, file: UploadFile) => {
    console.log("Upload thất bại:", error, file);
    toast.error("Upload thất bại", { autoClose: 3000 });
  };

  return (
    <>
      <div className="flex justify-between gap-5">
        <div className="max-w-full w-full">
          <Label>
            <span className="text-red-500">*</span>Name
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="nhập tên sản phẩm" />
            )}
          />
        </div>
        <div className="max-w-full w-full flex flex-col">
          <Label>
            <span className="text-red-500">*</span>Category
          </Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                showSearch
                placeholder="Chọn danh mục"
                optionFilterProp="label"
                options={
                  Array.isArray(categoryList)
                    ? categoryList.map((category) => ({
                        value: category._id,
                        label: category.name,
                      }))
                    : []
                }
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-between gap-5 mt-5">
        <div className="max-w-full w-full">
          <Label>
            <span className="text-red-500">*</span>Price
          </Label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="nhập giá sản phẩm" />
            )}
          />
        </div>
        <div className="max-w-full w-full">
          <Label>
            <span className="text-red-500">*</span>OriginalPrice
          </Label>
          <Controller
            name="originalPrice"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="nhập giá cũ sản phẩm" />
            )}
          />
        </div>
      </div>

      <div className="flex justify-between gap-5 mt-5">
        <div className="max-w-full w-full">
          <Label>
            <span className="text-red-500">*</span>Image
          </Label>
          <FileUploader
            action="/upload-thumbnail-product"
            fieldName="image"
            multiple
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
        <div className="max-w-full w-full">
          <Label>
            <span className="text-red-500">*</span>Gallery
          </Label>
          <FileUploader
            action="/upload-gallery-product"
            fieldName="photos"
            multiple
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>

      <div className="mt-10">
        <Label>
          <span className="text-red-500">*</span>Description
        </Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <TextArea {...field} rows={5} />}
        />
      </div>

      <div className="mt-5">
        <Label>
          <span className="text-red-500">*</span>Content
        </Label>
        <Controller
          name="detaildescription"
          control={control}
          render={({ field }) => (
            <Editor
              apiKey="vx5npguuuktlxhbv9tv6vvgjk1x5astnj8kznhujei9w6ech"
              value={field.value}
              onEditorChange={field.onChange}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright | outdent indent | numlist bullist | image",
              }}
            />
          )}
        />
      </div>
    </>
  );
}
