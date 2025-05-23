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
  onFileGalleryUrlChange: (urls: string[]) => void;
};
export default function ProductForm({
  onFileUrlChange,
  onFileGalleryUrlChange,
}: ProductFormProps) {
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

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

  const handleGallerySuccess = (res: unknown) => {
    const urls = res as string[];

    if (Array.isArray(urls) && urls.every((url) => typeof url === "string")) {
      const newUrls = [...galleryUrls, ...urls];
      setGalleryUrls(newUrls);
      onFileGalleryUrlChange(newUrls);
      toast.success("Upload ảnh thành công!", { autoClose: 3000 });
    } else {
      toast.error("Dữ liệu trả về không hợp lệ", { autoClose: 3000 });
    }
  };

  const handleError = (error: Error, file: UploadFile) => {
    console.log("Upload thất bại:", error, file);
    toast.error("Upload thất bại", { autoClose: 3000 });
  };

  return (
    <>
      <div className="flex gap-3 flex-col lg:flex-row lg:gap-5 lg:justify-between ">
        <div className="max-w-full w-full">
          <Label>
            <span className="text-red-500">*</span>Name
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="nhập tên sản phẩm" size="large" />
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
                size="large"
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

      <div className="lg:flex-row lg:justify-between flex gap-3 flex-col lg:gap-5 mt-3">
        <div className="max-w-full w-full">
          <Label>
            <span className="text-red-500">*</span>Price
          </Label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="nhập giá sản phẩm" size="large" />
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
              <Input
                {...field}
                placeholder="nhập giá cũ sản phẩm"
                size="large"
              />
            )}
          />
        </div>
      </div>

      <div className="lg:flex-row lg:justify-between flex gap-3 flex-col lg:gap-5 mt-3">
        <div className="max-w-full w-full">
          <Label>
            <span className="text-red-500">*</span>Images
          </Label>
          <div>
            <FileUploader
              action="/upload-thumbnail-product"
              fieldName="image"
              multiple
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        </div>
        <div className="max-w-full w-full">
          <Label>
            <span className="text-red-500">*</span>Gallery
          </Label>
          <div>
            <FileUploader
              action="/upload-gallery-product"
              fieldName="photos"
              multiple
              onSuccess={handleGallerySuccess}
              onError={handleError}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
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
              apiKey={process.env.VITE_TINYMCE_API_KEY}
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
