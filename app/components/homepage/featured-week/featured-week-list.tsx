import Image from "next/image";
import FeaturedWeekItem from "./featured-week-item";

export default function FeaturedWeekList({ featuredProducts }: any) {
  const upperFeaturedProducts = featuredProducts.slice(0, 4);
  const lowerFeaturedProducts = featuredProducts.slice(4, 8);

  return (
    <>
      <div className="featured-article-list">
        <div className="flex flex-wrap ml-2">
          {upperFeaturedProducts.map((featuredProduct: any) => (
            <FeaturedWeekItem featuredProduct={featuredProduct} key={featuredProduct.product_id} />
          ))}
        </div>
        <div className="flex flex-wrap ml-2">
          {lowerFeaturedProducts.map((featuredProduct: any) => (
            <FeaturedWeekItem featuredProduct={featuredProduct} key={featuredProduct.product_id} />
          ))}
        </div>
      </div>
    </>
  );
}

