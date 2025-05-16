"use client";

import { useFetchSizeById } from "@/data/size/useFetchSize";
import useSizeMutation from "@/data/size/useSizeMutation";
import { Button, Form, FormProps, Input } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function EditSize() {
  const { id } = useParams();
  const [form] = Form.useForm<Size>();

  const { data: size } = useFetchSizeById(String(id));

  useEffect(() => {
    if (size) {
      form.setFieldsValue({
        name: size?.name,
        minHeight: size?.minHeight,
        maxHeight: size?.maxHeight,
        minWeight: size?.minWeight,
        maxWeight: size?.maxWeight,
      });
    }
  }, [size, form]);

  const { editSize } = useSizeMutation();

  const onFinish: FormProps<Size>["onFinish"] = async (size) => {
    const _id = id as string;
    try {
      const result = await editSize.mutate({ _id, size });
      console.log("result", result);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const onFinishFailed: FormProps<Size>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="">
      <h1 className="mb-4 text-xl">Thêm kích thước</h1>
      <div className="bg-white p-10 rounded-lg max-w-full">
        <Form
          form={form}
          layout="vertical"
          className=""
          name="basic"
          style={{ maxWidth: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="flex justify-between gap-5">
            <Form.Item<Size>
              name="name"
              label="Name"
              className="w-full"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="flex justify-between gap-5">
            <Form.Item<Size>
              name="minHeight"
              label="MinHeight"
              className="w-full"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<Size>
              name="maxHeight"
              label="MaxHeight"
              className="w-full"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="flex justify-between gap-5">
            <Form.Item<Size>
              name="minWeight"
              label="MinWeight"
              className="w-full"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<Size>
              name="maxWeight"
              label="MaxWeight"
              className="w-full"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item label={null}>
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
                Cập nhật kích thước
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
