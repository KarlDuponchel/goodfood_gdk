import { useFetchProductByID } from "@/hooks/catalog/use_fetch_product_by_id";
import { OrderContent } from "@/utils/types";

type ContentInfoProps = {
  orderContent: OrderContent;
};

export const ContentInfo = ({ orderContent }: ContentInfoProps) => {
  const content = useFetchProductByID(orderContent.idContent);

  if (!content.data) return <div>Loading...</div>;

  return (
    <li className="text-gray-700">
      {content.data.name}{" "}
      {orderContent.quantity > 1 ? `x${orderContent.quantity}` : ""}
    </li>
  );
};
