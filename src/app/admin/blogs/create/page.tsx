"use client";

import FileUploader from "@/components/ui/file-uploader";
import useBlogMutation from "@/data/blog/useBlogMutation";
import { Label } from "@medusajs/ui";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Input, Select, UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateBlog() {
  const [uploadedFiles, setUploadedFiles] = useState<string | null>(null);
  const [uploadedGallery, setUploadedGallery] = useState<string[]>([]);

  const { handleSubmit, control, setValue } = useForm<CreateBlog>({
    defaultValues: {
      title: "",
      author: "",
      description: "",
    },
  });

  const { createBlog } = useBlogMutation();

  useEffect(() => {
    setValue("gallery", uploadedGallery);
  }, [uploadedGallery, setValue]);

  const handleGallerySuccess = (res: unknown) => {
    const urls = res as string[];

    if (Array.isArray(urls) && urls.every((url) => typeof url === "string")) {
      setUploadedGallery((prev) => [...prev, ...urls]);
      toast.success("Upload ảnh thành công!", { autoClose: 3000 });
    } else {
      toast.error("Dữ liệu trả về không hợp lệ", { autoClose: 3000 });
    }
  };

  const handleSuccess = (res: unknown) => {
    const url = res as string;
    if (typeof url === "string" && url.startsWith("http")) {
      setUploadedFiles(url);
      toast.success("Upload thành công!", { autoClose: 3000 });
      console.log("URL đã được lưu:", url);
    } else {
      toast.error("URL không hợp lệ", { autoClose: 3000 });
    }
  };

  const handleError = (error: Error, file: UploadFile) => {
    console.log("Upload thất bại:", error, file);
    toast.error("Upload thất bại", { autoClose: 3000 });
  };

  const onSubmit = async (data: CreateBlog) => {
    await createBlog.mutateAsync({
      ...data,
      gallery: uploadedGallery,
      thumbnail: uploadedFiles,
    });
  };
  return (
    <div>
      <h1 className="text-xl mb-4">Thêm mới tin tức</h1>
      <div className="bg-white p-6 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-5">
            <div className="max-w-full w-full">
              <Label>
                <span className="text-red-500">*</span>Title
              </Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="nhập tên bài viết" />
                )}
              />
            </div>
            <div className="max-w-full w-full">
              <Label>
                <span className="text-red-500">*</span>Author
              </Label>
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="nhập tác giả" />
                )}
              />
            </div>
          </div>

          <div className="flex justify-between gap-5 mt-4">
            <div className="max-w-full w-full">
              <Label>
                <span className="text-red-500">*</span>Thumbnail
              </Label>
              <div>
                <FileUploader
                  action="/upload-thumbnail-blog"
                  fieldName="blog"
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
                  action="/upload-gallery-blog"
                  fieldName="photos"
                  multiple
                  onSuccess={handleGallerySuccess}
                  onError={handleError}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label>
              <span className="text-red-500">*</span>Description
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <TextArea {...field} cols={3} rows={5} />}
            />
          </div>

          <div className="mt-4">
            <Label>
              <span className="text-red-500">*</span>Content
            </Label>
            <Controller
              name="content"
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

          <div className="mt-4">
            <Label>
              <span className="text-red-500">*</span>Tags
            </Label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Nhập và nhấn Enter để tạo tag"
                />
              )}
            />
          </div>

          <Button className="mt-4" type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </form>
      </div>
    </div>
  );
}
