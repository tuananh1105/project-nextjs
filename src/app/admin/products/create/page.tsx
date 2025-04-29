"use client";

import FileUploader from "@/components/ui/file-uploader";
import { toast } from "react-toastify";

export default function CreateProduct() {
  return (
    <div>
      Thêm sản phẩ
      <main>
        <FileUploader
          action="/upload-thumbnail-product"
          fieldName="image"
          multiple
          onSuccess={(res) => toast("Upload thành công:", res)}
          onError={(error, file) =>
            console.log("Upload thất bại:", error, file)
          }
        />
      </main>
    </div>
  );
}
