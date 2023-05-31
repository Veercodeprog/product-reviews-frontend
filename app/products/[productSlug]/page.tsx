import 'server-only'
import Breadcrumb from "../../components/layout/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import TabSection from "../../components/productpage/Tab";
import Image from "next/image";
import { fetchObjectFromProducts } from "@/app/utils/dataApi";

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
                  {product.name}
                </h2>
</div>
                <p className="card-text para leading-tight">
                  {product.short_description}
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

       <div className="max-w-3xl mx-auto p-4 justify-start">
        <h1 className="text-2xl font-bold mb-4">Comments</h1>
        <div className="bg-gray-100 rounded-lg shadow p-4">
          {/* Single comment */}
          <div className="flex space-x-4 mb-4">
            <div className="flex-shrink-0">
              <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="User Avatar" />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis nibh
                consectetur, fringilla libero at, eleifend est.</p>
              <div className="flex items-center space-x-2 mt-2">
                <button className="text-blue-500">Reply</button>
                <button className="text-gray-500">Like</button>
                <button className="text-gray-500">Dislike</button>
              </div>
            </div>
          </div>
          {/* Add more comments here */}
        </div>
        {/* Comment form */}
        <form className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Leave a comment</h2>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/50" alt="User Avatar" />
            </div>
            <div className="flex-grow">
              <textarea className="w-full h-20 p-2 border border-gray-300 rounded" placeholder="Write your comment..." defaultValue={""} />
              <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            </div>
          </div>
        </form>
      </div>


     
    </main>
  );
}


