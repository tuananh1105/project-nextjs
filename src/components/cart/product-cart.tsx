import Image from "next/image";
import { ChevronDownMini, Minus, Plus } from "@medusajs/icons";
import CurrencyVND from "@/utils/helper";
import { TrashMini } from "@/components/ui/icon";
const CartProduct = ({
  product,
  handleModalDeleteCart,
  handleModalUpateCart,
  checked,
  onCheckboxChange,
  quantity,
  handleReduce,
  handleIncrease,
}: {
  product: ProductCart;
  handleModalDeleteCart: () => void;
  handleModalUpateCart: () => void;
  checked: boolean;
  onCheckboxChange: () => void;
  quantity: number;
  handleReduce: () => void;
  handleIncrease: () => void;
}) => {
  return (
    <div className="flex justify-between mt-10">
      <div className="flex gap-3">
        <div className="m-auto">
          <input
            type="checkbox"
            checked={checked}
            onChange={onCheckboxChange}
            className="custom-checkbox cursor-pointer"
          />
        </div>
        <div className="flex gap-3">
          <Image
            src={product.image || ""}
            alt="Fashion Zone"
            className="bg-white object-cover rounded-lg"
            width={130}
            height={150}
          />
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[#111928]">{product.name}</p>
              <button
                onClick={handleModalUpateCart}
                className="border-[1px] flex gap-2 text-[12px] rounded-full py-0.5 px-3 border-gray-300 mt-2 cursor-pointer"
              >
                {product.color}, {product.size} <ChevronDownMini />
              </button>
            </div>
            <div className="flex items-center justify-between px-2 hover:border-gray-400 gap-4 border-[1px] border-gray-300 rounded-full w-30 py-1">
              <button
                onClick={handleReduce}
                className="text-gray-500 hover:text-black"
              >
                <Minus className="cursor-pointer" />
              </button>
              <span className="mx-4 text-base font-medium">
                {product.quantity && quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="text-gray-500 hover:text-black"
              >
                <Plus className="cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <button onClick={handleModalDeleteCart} className="flex justify-end">
          <TrashMini />
        </button>
        <p className="font-medium">
          <CurrencyVND amount={Number(product.totalPrice)} />
        </p>
      </div>
    </div>
  );
};

export default CartProduct;
