"use client";
import { Label } from "@medusajs/ui";
import { Button, Input } from "antd";
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
  const [newAttrName, setNewAttrName] = useState("");
  const [newAttrValues, setNewAttrValues] = useState("");

  const { register } = useFormContext<ProductCreate>();

  const addAttribute = () => {
    if (!newAttrName || !newAttrValues) return;
    const values = newAttrValues
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    if (!values.length) return;
    setAttributes([...attributes, { name: newAttrName, values }]);
    setNewAttrName("");
    setNewAttrValues("");
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
            <Input
              value={newAttrName}
              onChange={(e) => setNewAttrName(e.target.value)}
              className="border p-2 w-full rounded mb-2"
              placeholder="Ví dụ: Màu, Size"
            />
          </div>
          <div className="max-w-full w-full">
            <Label className="block font-medium mb-1">
              <span className="text-red-500">*</span>Giá trị (phân cách bởi dấu
              phẩy)
            </Label>
            <Input
              value={newAttrValues}
              onChange={(e) => setNewAttrValues(e.target.value)}
              className="border p-2 w-full rounded mb-2"
              placeholder="Ví dụ: Đỏ, Xanh, Vàng"
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
      )}
    </div>
  );
}
