"use client";

import ProductVariantForm from "@/components/products/product-admin/form-product-variants";
import ProductForm from "@/components/products/product-admin/product-form";
import useProductMutation from "@/data/products/useProductMutation";
import { Button } from "antd";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

export default function CreateProduct() {
  const methods = useForm<ProductCreate>({
    defaultValues: {},
  });

  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

  const { createProduct } = useProductMutation();
  const handleFileUrlChange = (url: string) => {
    setFileUrl(url);
  };
  const onSubmit = async (data: ProductCreate) => {
    await createProduct.mutateAsync({
      ...data,
      hasVariants: true,
      image: fileUrl || "",
      gallery: galleryUrls,
    });
  };

  return (
    <div>
      <h1 className="text-xl mb-4">Thêm mới sản phẩm</h1>
      <div className="bg-white p-6 rounded-lg">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ProductForm
              onFileUrlChange={handleFileUrlChange}
              onFileGalleryUrlChange={(urls) => setGalleryUrls(urls)}
            />
            <ProductVariantForm />
            <div className="flex justify-end mt-5">
              <Button type="primary" htmlType="submit">
                Thêm sản phẩm
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
