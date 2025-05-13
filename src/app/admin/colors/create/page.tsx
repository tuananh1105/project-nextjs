"use client";

import useColorMutation from "@/data/colors/useColorMutation";
import { Button, Form, FormProps, Input } from "antd";

export default function CreateColor() {
  const { createColor } = useColorMutation();

  const onFinish: FormProps<Color>["onFinish"] = async (values) => {
    try {
      const result = await createColor.mutate(values);
      console.log("result", result);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const onFinishFailed: FormProps<Color>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="">
      <h1 className="mb-4 text-xl">Thêm màu sắc</h1>
      <div className="bg-white p-10 rounded-lg max-w-[700px]">
        <Form
          layout="vertical"
          className=""
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<Color>
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Color>
            name="colorCode"
            label="ColorCode"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
                Thêm màu sắc
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
