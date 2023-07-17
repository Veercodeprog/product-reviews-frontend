import "server-only";
import ProductDetail from "@/app/components/productpage/products-description/productdetail";
import Breadcrumb from "../../components/layout/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TabSection from "../../components/productpage/Tab";
import { getAllReviewByProduct } from "@/app/utils/postDataApi";
import { fetchObjectFromProducts } from "@/app/utils/dataApi";
import Reviews from "@/app/components/productpage/products-description/reviews";
import OverviewTab from "@/app/components/productpage/Overview-tab-section";
import ReviewTab from "@/app/components/productpage/Reviews-tab-section";
import FoundersTab from "@/app/components/productpage/Founders-tab-section";
import FeaturesTab from "@/app/components/productpage/Features-tab-section";


type TabProps = {
  tab: {
    id: string;
title: string;
    // other properties of the tab object
  };
 toggle: (id: string) => void;
};
interface Product {
  product_id: number;
  name: string;
  short_description?: string;
  icon?: string;
  website_url?: string;
  overview?: string;
  features?: string;
  tags?: string;
  images?: string;
  video_url?: string;
  user_id?: string;
  category_id: number;
}

interface Props {
  params: {
    productSlug: string;
  };
}

export default async function ProductsDescriptionPage(props: Props) {
  const { productSlug } = props.params;

  const unslugifiedProductName = unslugify(productSlug);
  const fetchCurrentProduct: Promise<Product> = fetchObjectFromProducts(
    unslugifiedProductName
  );

  const product = await fetchCurrentProduct;
const tabs = [
  { id: 'tab1',title:'Overview' , content: <OverviewTab product={product} /> },
  { id: 'tab2',title:'Feature' , content: <FeaturesTab product={product} /> },
  { id: 'tab3',title:'Founders' , content: <FoundersTab product={product} />},
  { id: 'tab4',title:'Reviews' , content: <ReviewTab product={product} /> },
];
  function unslugify(slug: string) {
    // Replace hyphens with spaces and capitalize the first letter of each word
    const words = slug.split("-");
    const unslugified = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return unslugified;
  }

  return (
    <main className="container md:w-[90%] px-4 mx-auto mt-16">
      <Breadcrumb />
     

      <section className=" ">
        <div className="text-gray-700 body-font mt-7">
          <div className="container sm:mx-auto grid sm:px-2 sm:py-2 sm:items-center">
            <div className="">
              <ProductDetail product={product} />

            </div>

            <div className=" ">
              <div className="flex justify-center  md:justify-end mt-4 sm:hidden  sm:items-start sm:justify-start md:mr-0   ">
                {/* <FontAwesomeIcon icon={faHeart} className="text-2xl mr-3" /> */}
                <button
                  type="button"
                  className="flex-shrink-0 h-10 border border-purple-800 bg-white bg-opacity-0 hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-gray-800 text-sm px-6 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mr-3"
                >
                  View more
                </button>
                <button
                  type="button"
                  className="flex-shrink-0 h-10 bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium  text-white text-sm px-4 py-2 text-center  dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900"
                >
                  Go to Website
                </button>
              </div>
              <div className="hidden sm:flex md:justify-end mt-4 md:items-end ">
                <div className="flex">
                  {/* <FontAwesomeIcon icon={faHeart} className="text-2xl mr-14 " /> */}
                  <button
                    type="button"
                    className="max-w-4xl border border-purple-800 bg-white bg-opacity-0 hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-gray-800 text-sm px-6 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900 mr-3"
                  >
                    View more 
                  </button>
                  <button
                    type="button"
                    className="bg-purple-800 hover:bg-purple-900focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium  text-white text-sm px-4 py-2 text-center  dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900"
                  >
                    Go to Website
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 <TabSection product={product} />
{/* <TabSection tabs={tabs} product={product} /> */}

    </main>
  );
}
