import 'server-only'
import ProductDetail from '@/app/components/productpage/products-description/productdetail';
import Breadcrumb from "../../components/layout/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TabSection from "../../components/productpage/Tab";
import { getAllReviewByProduct } from '@/app/utils/postDataApi';
import { fetchObjectFromProducts } from "@/app/utils/dataApi";
import Reviews from '@/app/components/productpage/products-description/reviews';

interface Product {
  name: string;
  short_description?: string;
  // Define other product properties here
}

interface Props {
  params: {
    productSlug: string;
  };
}


export default async function ProductsDescriptionPage(props: Props) {
  const { productSlug } = props.params;

 
        const unslugifiedProductName = unslugify(productSlug);
        const fetchCurrentProduct: Promise<Product> =  fetchObjectFromProducts(unslugifiedProductName);
        const product = await fetchCurrentProduct;



  function unslugify(slug: string) {
    // Replace hyphens with spaces and capitalize the first letter of each word
    const words = slug.split('-');
    const unslugified = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return unslugified;
  }


  return (
    <main className="container mx-auto p-4 md:px-10 md:pr-10 mt-16">
      <Breadcrumb />
{/* 
      {product && (
        <div>
          <h2>{product.name}</h2>
          {product.short_description && <p>{product.short_description}</p>}
         
        </div>
      )}

 */ }

<section className="sm:ml-10 se:ml-10 md:ml-0 ss:ml-20">
      <div className="text-gray-700 body-font mt-7">
        <div className="container sm:mx-auto flex sm:px-2 sm:py-2 md:flex-row sm:-ml-12 md:ml-0  flex-col sm:items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
<ProductDetail product={product} />


           

            {/* <div className="flex justify-center">
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Button</button>
            </div> */}
          </div>

          <div className="lg:max-w-lg lg:w-full xs:-ml-16 sm:ml-0	 ss:mr-16 md:w-1/2 w-5/6">
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
{/* <div className=" reviews">
<Reviews product={product} />
</div> */}
     


     
    </main>
  );
}


