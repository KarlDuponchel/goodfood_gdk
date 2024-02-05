import { OrderContent } from "@/utils/types";

type ContentTotalPriceProps = {
  orderContents: OrderContent[];
};

export const ContentTotalPrice = ({
  orderContents,
}: ContentTotalPriceProps) => {
  const getTotalPrice = () => {
    let totalPrice = 0;
    orderContents.map((content) => {
      totalPrice += content.price * content.quantity;
    });
    return totalPrice;
  };
  return <span className="text-gray-700">{getTotalPrice().toFixed(2)}€</span>;
};
