import Checkout from "@/components/checkout/checkout-page";
import { Suspense } from "react";

export default function CheckoutPageWrapper() {
  return (
    <Suspense fallback={<p>Đang tải...</p>}>
      <Checkout />
    </Suspense>
  );
}
