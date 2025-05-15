import useOrderMutation from "@/data/order/useOrderMutation";

function useUpdateOrderStatus() {
    const { updateOrder } = useOrderMutation();
  
    const updateOrderStatus = async ({
      id,
      status,
    }: {
      id: string;
      status: OrderStatus;
    }) => {
      await updateOrder.mutateAsync({
        orderId: id,
        status,
      });
    };
  
    return { updateOrderStatus };
  }

  export default useUpdateOrderStatus
  