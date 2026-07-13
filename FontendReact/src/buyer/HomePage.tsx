import BannerCarousel from "./components/BannerCarousel";
import CategoryList from "./components/CategoryList";
import ProductGrid from "./components/ProductGrid";
import type { BuyerPage } from "../portals/BuyerPortal";

interface Props {
  onNavigate: (p: BuyerPage) => void;
}

export default function HomePage({ onNavigate }: Props) {
  return (
    <div className="w-full pb-10">
      <BannerCarousel />
      <CategoryList />
      <ProductGrid />
    </div>
  );
}
