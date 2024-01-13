import { ProductDetailPage } from "@/containers/products/ProductDetailPage";

export default function Page({ params }: { params: { slug: number } }) {
  return <ProductDetailPage idProduct={params.slug} />;
}
