"use client";
import { useFetchColor } from "@/data/colors/useFetchColor";
import { useFetchSize } from "@/data/size/useFetchSize";
import { Label } from "@medusajs/ui";
import { Button, Select } from "antd";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type Attribute = {
  name: string;
  values: string[];
};

type Variant = {
  attributes: Record<string, string>;
  price: number;
  countInStock: number;
  sku: string;
  weight: number;
};

const cartesianProduct = (arrays: string[][]): string[][] =>
  arrays.reduce((a, b) => a.flatMap((x) => b.map((y) => [...x, y])), [
    [],
  ] as string[][]);

const generateVariants = (attributes: Attribute[]): Variant[] => {
  const names = attributes.map((attr) => attr.name);
  const values = attributes.map((attr) => attr.values);

  const combos = cartesianProduct(values);

  return combos.map((combo) => ({
    attributes: Object.fromEntries(combo.map((val, idx) => [names[idx], val])),
    price: 0,
    countInStock: 0,
    sku: "",
    weight: 0,
  }));
};

export default function ProductVariantForm() {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [newAttrName, setNewAttrName] = useState("color");
  const [newAttrValues, setNewAttrValues] = useState<string[]>([]);
  const [pagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [bulkInput, setBulkInput] = useState({
    price: "",
    countInStock: "",
    sku: "",
    weight: "",
  });

  const applyBulkValues = () => {
    const updated = variants.map((v) => ({
      ...v,
      price: bulkInput.price ? +bulkInput.price : v.price,
      countInStock: bulkInput.countInStock
        ? +bulkInput.countInStock
        : v.countInStock,
      sku: bulkInput.sku || v.sku,
      weight: bulkInput.weight ? +bulkInput.weight : v.weight,
    }));
    setVariants(updated);
  };

  const { data: colorList } = useFetchColor({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const { data: sizeList } = useFetchSize({
    page: pagination.current,
    limit: pagination.pageSize,
  });

  const options =
    newAttrName === "color"
      ? colorList?.data?.map((item) => ({
          label: item.name,
          value: item.colorCode,
        }))
      : sizeList?.data?.map((item) => ({
          label: item.name,
          value: item.name,
        }));

  const { register } = useFormContext<ProductCreate>();

  const addAttribute = () => {
    const name = newAttrName.trim();

    if (!name || newAttrValues.length === 0) return;

    const values = newAttrValues.map((v) => v.trim()).filter((v) => v);

    if (values.length === 0) return;

    setAttributes((prev) => [...prev, { name, values }]);

    setNewAttrName("");
    setNewAttrValues([]);
  };

  const generate = () => {
    const result = generateVariants(attributes);
    setVariants(result);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 mt-4">Tạo biến thể sản phẩm</h3>

      <div className="mb-4">
        <div className="flex justify-between gap-3">
          <div className="max-w-full w-full">
            <Label className="block font-medium mb-1">
              <span className="text-red-500">*</span>Tên thuộc tính
            </Label>
            <Select
              size="large"
              defaultValue="color"
              style={{ width: "100%" }}
              value={newAttrName}
              options={[
                { value: "color", label: "Color" },
                { value: "size", label: "Size" },
              ]}
              onChange={(value) => setNewAttrName(value)}
            />
          </div>
          <div className="max-w-full w-full">
            <Label className="block font-medium mb-1">
              <span className="text-red-500">*</span>Giá trị
            </Label>
            <Select
              mode="tags"
              size="large"
              placeholder="Vui lòng chọn"
              defaultValue={[]}
              style={{ width: "100%" }}
              options={options}
              onChange={(value) => setNewAttrValues(value)}
            />
          </div>
        </div>
        <Button className="mt-5" onClick={addAttribute}>
          Thêm thuộc tính
        </Button>
      </div>

      {attributes.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Thuộc tính đã thêm:</h4>
          <ul className="list-disc ml-5">
            {attributes.map((attr, idx) => (
              <li key={idx}>
                {attr.name}: {attr.values.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {attributes.length > 0 && (
        <Button onClick={generate}>Sinh biến thể</Button>
      )}

      {variants.length > 0 && (
        <div>
          <table className="w-full mt-6 border border-gray-400">
            <thead>
              <tr>
                {Object.keys(variants[0].attributes).map((attr, i) => (
                  <th key={i} className="border border-gray-400 p-2">
                    {attr}
                  </th>
                ))}
                <th className="border border-gray-400 p-2">Price</th>
                <th className="border border-gray-400 p-2">Stock</th>
                <th className="border border-gray-400 p-2">SKU</th>
                <th className="border border-gray-400 p-2">Weight</th>
              </tr>

              <tr>
                {Object.keys(variants[0].attributes).map((_, i) => (
                  <td key={i} className="border border-gray-400 p-2"></td>
                ))}
                <td className="border border-gray-400 p-2">
                  <input
                    type="number"
                    value={bulkInput.price}
                    onChange={(e) =>
                      setBulkInput({ ...bulkInput, price: e.target.value })
                    }
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    type="number"
                    value={bulkInput.countInStock}
                    onChange={(e) =>
                      setBulkInput({
                        ...bulkInput,
                        countInStock: e.target.value,
                      })
                    }
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    value={bulkInput.sku}
                    onChange={(e) =>
                      setBulkInput({ ...bulkInput, sku: e.target.value })
                    }
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    value={bulkInput.weight}
                    onChange={(e) =>
                      setBulkInput({ ...bulkInput, weight: e.target.value })
                    }
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
              </tr>
            </thead>

            <tbody>
              {variants.map((variant, idx) => (
                <tr key={idx}>
                  {Object.entries(variant.attributes).map(([key, val], i) => (
                    <td key={i} className="border border-gray-400 p-2">
                      <input
                        type="hidden"
                        {...register(`variants.${idx}.${key}`)}
                        value={val}
                      />
                      {val}
                    </td>
                  ))}
                  <td className="border border-gray-400 p-2">
                    <input
                      {...register(`variants.${idx}.price`)}
                      type="number"
                      value={variant.price}
                      onChange={(e) => {
                        const v = [...variants];
                        v[idx].price = +e.target.value;
                        setVariants(v);
                      }}
                      className="w-full p-1 border border-gray-400 rounded"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      {...register(`variants.${idx}.countInStock`)}
                      type="number"
                      value={variant.countInStock}
                      onChange={(e) => {
                        const v = [...variants];
                        v[idx].countInStock = +e.target.value;
                        setVariants(v);
                      }}
                      className="w-full p-1 border border-gray-400 rounded"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      {...register(`variants.${idx}.sku`)}
                      value={variant.sku}
                      onChange={(e) => {
                        const v = [...variants];
                        v[idx].sku = e.target.value;
                        setVariants(v);
                      }}
                      className="w-full p-1 border border-gray-400 rounded"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    <input
                      {...register(`variants.${idx}.weight`)}
                      value={variant.weight}
                      onChange={(e) => {
                        const v = [...variants];
                        v[idx].weight = +e.target.value;
                        setVariants(v);
                      }}
                      className="w-full p-1 border border-gray-400 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button className="mt-3" onClick={applyBulkValues}>
            Áp dụng cho tất cả
          </Button>
        </div>
      )}
    </div>
  );
}
