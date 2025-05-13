"use client";

import useSizeMutation from "@/data/size/useSizeMutation";
import { Button, Form, FormProps, Input } from "antd";

export default function CreateSize() {
  const { createSize } = useSizeMutation();
  const onFinish: FormProps<Size>["onFinish"] = async (values) => {
    try {
      const result = await createSize.mutate(values);
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
                Thêm Kích thước
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
