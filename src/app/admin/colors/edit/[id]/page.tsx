"use client";

import useColorMutation from "@/data/colors/useColorMutation";
import { useFetchColorById } from "@/data/colors/useFetchColor";
import { Button, Form, FormProps, Input } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function EditColor() {
  const { id } = useParams();
  const [form] = Form.useForm<Color>();

  const { data: color } = useFetchColorById(String(id));
  useEffect(() => {
    if (color) {
      form.setFieldsValue({
        name: color?.name,
        colorCode: color?.colorCode,
      });
    }
  }, [color, form]);

  const { editColor } = useColorMutation();

  const onFinish: FormProps<Color>["onFinish"] = async (color) => {
    const _id = id as string;
    try {
      const result = await editColor.mutate({ _id, color });
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
      <h1 className="mb-4 text-xl">Cập nhật màu sắc</h1>
      <div className="bg-white p-10 rounded-lg max-w-[700px]">
        <Form
          form={form}
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
                Cập nhật màu sắc
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
