"use client";
import { useState } from "react";

type Attribute = {
  name: string;
  values: string[];
};

type Variant = {
  attributes: Record<string, string>;
  price: number;
  countInStock: number;
  sku: string;
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
  }));
};

export default function ProductVariantTest() {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [newAttrName, setNewAttrName] = useState("");
  const [newAttrValues, setNewAttrValues] = useState("");

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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Test tạo biến thể sản phẩm</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Tên thuộc tính</label>
        <input
          value={newAttrName}
          onChange={(e) => setNewAttrName(e.target.value)}
          className="border p-2 w-full rounded mb-2"
          placeholder="Ví dụ: Màu, Size"
        />
        <label className="block font-medium mb-1">
          Giá trị (phân cách bởi dấu phẩy)
        </label>
        <input
          value={newAttrValues}
          onChange={(e) => setNewAttrValues(e.target.value)}
          className="border p-2 w-full rounded mb-2"
          placeholder="Ví dụ: Đỏ, Xanh, Vàng"
        />
        <button
          onClick={addAttribute}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Thêm thuộc tính
        </button>
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
        <button
          onClick={generate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Sinh biến thể
        </button>
      )}

      {variants.length > 0 && (
        <table className="w-full mt-6 border border-gray-300">
          <thead>
            <tr>
              {Object.keys(variants[0].attributes).map((attr, i) => (
                <th key={i} className="border p-2">
                  {attr}
                </th>
              ))}
              <th className="border p-2">Giá</th>
              <th className="border p-2">Kho</th>
              <th className="border p-2">SKU</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant, idx) => (
              <tr key={idx}>
                {Object.values(variant.attributes).map((val, i) => (
                  <td key={i} className="border p-2">
                    {val}
                  </td>
                ))}
                <td className="border p-2">
                  <input
                    type="number"
                    value={variant.price}
                    onChange={(e) => {
                      const v = [...variants];
                      v[idx].price = +e.target.value;
                      setVariants(v);
                    }}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={variant.countInStock}
                    onChange={(e) => {
                      const v = [...variants];
                      v[idx].countInStock = +e.target.value;
                      setVariants(v);
                    }}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="border p-2">
                  <input
                    value={variant.sku}
                    onChange={(e) => {
                      const v = [...variants];
                      v[idx].sku = e.target.value;
                      setVariants(v);
                    }}
                    className="w-full p-1 border rounded"
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
