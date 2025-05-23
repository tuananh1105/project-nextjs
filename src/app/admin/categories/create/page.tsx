"use client";

import useCategoryMutation from "@/data/categories/useCategoryMutation";
import { Button, Form, FormProps, Input, Switch } from "antd";

export default function CreateCategory() {
  const { createCategory } = useCategoryMutation();

  const onFinish: FormProps<Categories>["onFinish"] = async (values) => {
    try {
      const result = await createCategory.mutate(values);
      console.log("result", result);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const onFinishFailed: FormProps<Categories>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="">
      <h1 className="mb-4 text-xl">Thêm danh mục</h1>
      <div className="bg-white p-5 rounded-lg max-w-[700px]">
        <Form
          className=""
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<Categories>
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Categories>
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input your status!" }]}
            valuePropName="checked"
            getValueFromEvent={(checked: boolean) =>
              checked ? "SHOW" : "HIDE"
            }
            getValueProps={(value: string) => ({ checked: value === "SHOW" })}
          >
            <Switch defaultChecked />
          </Form.Item>

          <Form.Item label={null}>
            <div className="flex justify-end mt-5">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
