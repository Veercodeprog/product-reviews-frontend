'use client'
import Breadcrumb from "../../components/layout/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import TabSection from "../../components/productpage/Tab";
import Image from "next/image";
import { useRouter, useSearchParams ,usePathname} from "next/navigation";
import { fetchObjectFromProducts } from "@/app/utils/dataApi";
import { useState, useEffect } from "react";



export default function ProductsDescriptionPage(props) {
 const router = useRouter();
  // const  productSlug  = useSearchParams(); 
console.log("props:", props)
  const pathname = usePathname();
const {productSlug} = props.params
console.log("productSlug:",productSlug)
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const unslugifiedProductName = unslugify(productSlug);
        const response = await fetchObjectFromProducts(unslugifiedProductName, );
        setProduct(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (productSlug) {
      fetchProduct();
    }
  }, [productSlug]);

  function unslugify(slug) {
    // Replace hyphens with spaces and capitalize the first letter of each word
    const words = slug.split('-');
    const unslugified = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return unslugified;
  }
return (
    <main className="container mx-auto p-4  md:px-10 md:pr-10 mt-16 ">
      <Breadcrumb />
{product && (
        <div>
          <h2>{product.name}</h2>
          <p>{product.short_description}</p>
          {/* Display other product details */}
        </div>
      )}
<section className="sm:ml-10 se:ml-10 md:ml-0 ss:ml-20">
      <div className="text-gray-700 body-font mt-7">
        <div className="container sm:mx-auto flex sm:px-2 sm:py-2 md:flex-row sm:-ml-12 md:ml-0  flex-col sm:items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <Image
                src="https://dummyimage.com/200x150/000/fff.jpg"
                width={200} height={150}
                alt="..."
                className="mr-8"
              />
              <div className="flex flex-col sm:flex-col mt-7 ">
<div className="flex-shrink-0">
                <h2 className="page-headings text-left mb-2 whitespace-nowrap">
                  Featured products
                </h2>
</div>
                <p className="card-text para leading-tight">
                  Your one stop customer support platform
                </p>
                <div className="card--stats md:mr-0 sm:mr-60 se:mr-60 ">
                  <FontAwesomeIcon icon={faHeart} className="items-start  mx-8" />
                  
                  <span className="gray mr-2">37</span>
                  <span className="gray">Reviews</span>
                </div>

                <div
                  className="text-left flex items-center sm:items-end my-3 "
                  role="group"
                  aria-label="Tools"
                >
                  <button
                    type="button"
                    className="  bg-white text-gray-700 border border-gray-300 rounded-full font-medium px-3  md:mr-2 mb-2 w-auto h-6 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-900 dark:focus:ring-gray-700"
                    style={{ lineHeight: "0.8" }}
                  >
                    Blogging
                  </button>
                  <button
                    type="button"
                    className="bg-white text-gray-700 border border-gray-300 rounded-full font-medium px-3 mr-2 mb-2 w-auto h-6 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-900 dark:focus:ring-gray-700"
                    style={{ lineHeight: "0.8" }}
                  >
                    Blogging
                  </button>
                  <button
                    type="button"
                    className="bg-white text-gray-700 border border-gray-300 rounded-full font-medium px-3 mr-2 mb-2 w-auto h-6 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-900 dark:focus:ring-gray-700"
                    style={{ lineHeight: "0.8" }}
                  >
                    All
                  </button>
                </div>
              </div>
            </div>

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
     <TabSection />

     
    </main>
  );
}


