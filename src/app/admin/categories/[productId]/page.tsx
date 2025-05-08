"use client";

import useCategoryMutation from "@/data/categories/useCategoryMutation";
import { useFetchCategoryById } from "@/data/categories/useFetchCategoryById";
import { Button, Form, FormProps, Input, Switch } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function EditCategory() {
  const { productId } = useParams();
  const [form] = Form.useForm<CategoriesEdit>();

  const { data: category } = useFetchCategoryById(String(productId));

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.category.name,
        status: category.category.status,
      });
    }
  }, [category, form]);

  const { editCategory } = useCategoryMutation();

  const onFinish: FormProps<CategoriesEdit>["onFinish"] = async (category) => {
    const id = productId as string;
    try {
      const result = await editCategory.mutate({ category, id });
      console.log("result", result);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const onFinishFailed: FormProps<CategoriesEdit>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="">
      <h1 className="mb-4 text-xl">Cập nhật danh mục</h1>
      <div className="bg-white p-10 rounded-lg max-w-[700px]">
        <Form
          form={form}
          className=""
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<CategoriesEdit>
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<CategoriesEdit>
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
            <Button
              type="primary"
              className="left-[500px] mt-5"
              htmlType="submit"
            >
              Cập Nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
