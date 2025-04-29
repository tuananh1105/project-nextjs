"use client";

import FileUploader from "@/components/ui/file-uploader";
import useBlogMutation from "@/data/blog/useBlogMutation";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, FormProps, Input, Select } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateBlog() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [content, setContent] = useState("");
  console.log("uploadedFiles", uploadedFiles);

  const { createBlog } = useBlogMutation();

  const handleSuccess = (res: Record<string, unknown>) => {
    const uploadedUrl = res?.url as string;
    if (uploadedUrl) {
      setUploadedFiles((prevFiles) => [...prevFiles, uploadedUrl]);
      toast("Upload thành công!");
    }
  };

  const onFinish: FormProps<CreateBlog>["onFinish"] = async (values) => {
    const finalValues = {
      ...values,
      gallery: uploadedFiles,
      content,
    };
    try {
      const result = await createBlog.mutate(finalValues);
      console.log("result", result);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const onFinishFailed: FormProps<CreateBlog>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleEditorChange = (content: string) => {
    setContent(content);
  };
  return (
    <div>
      <h1 className="text-xl mb-4">Thêm mới tin tức</h1>
      <div className="bg-white p-6 rounded-lg">
        <Form
          layout="vertical"
          name="basic"
          style={{ maxWidth: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="flex justify-between gap-5">
            <Form.Item<CreateBlog>
              label="Title"
              name="title"
              className="w-1/2"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<CreateBlog>
              label="Author"
              name="author"
              className="w-1/2"
              rules={[{ required: true, message: "Please input your author!" }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="flex justify-between gap-5">
            <Form.Item
              label="Thumbnail"
              name="thumbnail"
              className="w-1/2"
              rules={[{ required: true, message: "Please input thumbnail!" }]}
            >
              <FileUploader
                action="/upload-thumbnail-blog"
                fieldName="blog"
                multiple
                onSuccess={(res) => toast("Upload thành công", res)}
                onError={(error, file) =>
                  console.log("Upload thất bại:", error, file)
                }
              />
            </Form.Item>

            <Form.Item
              label="Gallery"
              name="gallery"
              className="w-1/2"
              rules={[{ required: true, message: "Please input gallery!" }]}
            >
              <FileUploader
                action="/upload-gallery-blog"
                fieldName="photos"
                multiple
                onSuccess={handleSuccess}
                onError={(error, file) =>
                  console.log("Upload thất bại:", error, file)
                }
              />
              {/* <div>
                <h3>File đã upload:</h3>
                <pre>{JSON.stringify(uploadedFiles, null, 2)}</pre>
              </div> */}
            </Form.Item>
          </div>

          <Form.Item<CreateBlog>
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item<CreateBlog>
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please input your content!" }]}
          >
            <Editor
              apiKey="vx5npguuuktlxhbv9tv6vvgjk1x5astnj8kznhujei9w6ech"
              value={content}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright | outdent indent | numlist bullist | image",
              }}
              onEditorChange={handleEditorChange}
            />
          </Form.Item>

          <Form.Item
            label="Tags"
            name="tag"
            rules={[{ required: true, message: "Please input tags!" }]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Nhập và nhấn Enter để tạo tag"
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
