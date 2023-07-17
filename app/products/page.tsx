"use client"
import Breadcrumb from "../components/layout/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import TabSection from "../components/productpage/Tab";
import Image from "next/image";

import { useRouter, useSearchParams } from "next/navigation";
export default function ProductsPage() {

  return (
    <main className="container p-4 mx-auto mt-16 md:px-10 md:pr-10 ">
      <Breadcrumb />
hi
<section className="sm:ml-10 se:ml-10 md:ml-0 ss:ml-20">
      <div className="text-gray-700 body-font mt-7">
        <div className="container flex flex-col sm:mx-auto sm:px-2 sm:py-2 md:flex-row sm:-ml-12 md:ml-0 sm:items-center">
        <div className="lg:flex-grow  md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
            <div className="flex flex-col items-start sm:flex-row sm:items-center">
              <Image
                src="https://dummyimage.com/200x150/000/fff.jpg"
                width={200} height={150}
                alt="..."
                className="mr-8"
              />
              <div className="flex flex-col sm:flex-col mt-7 ">
<div className="flex-shrink-0">
                <h2 className="mb-2 text-left page-headings whitespace-nowrap">
                  Featured products
                </h2>
</div>
                <p className="leading-tight card-text para">
                  Your one stop customer support platform
                </p>
                <div className="card--stats md:mr-0 sm:mr-60 se:mr-60 ">
                  <FontAwesomeIcon icon={faHeart} className="items-start mx-8" />
                  
                  <span className="mr-2 gray">37</span>
                  <span className="gray">Reviews</span>
                </div>

                <div
                  className="flex items-center my-3 text-left sm:items-end "
                  role="group"
                  aria-label="Tools"
                >
                  <button
                    type="button"
                    className="w-auto h-6 px-3 mb-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-full  md:mr-2 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-900 dark:focus:ring-gray-700"
                    style={{ lineHeight: "0.8" }}
                  >
                    Blogging
                  </button>
                  <button
                    type="button"
                    className="w-auto h-6 px-3 mb-2 mr-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-900 dark:focus:ring-gray-700"
                    style={{ lineHeight: "0.8" }}
                  >
                    Blogging
                  </button>
                  <button
                    type="button"
                    className="w-auto h-6 px-3 mb-2 mr-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-900 dark:focus:ring-gray-700"
                    style={{ lineHeight: "0.8" }}
                  >
                    All
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="flex justify-center">
              <button className="inline-flex px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">Button</button>
              <button className="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-200 border-0 rounded focus:outline-none hover:bg-gray-300">Button</button>
            </div> */}
          </div>

          <div className="w-5/6 lg:max-w-lg lg:w-full xs:-ml-16 sm:ml-0 ss:mr-16 md:w-1/2">
            <div className="flex justify-center mt-4 md:justify-end sm:hidden sm:items-start sm:justify-start md:mr-0 ">
              {/* <FontAwesomeIcon icon={faHeart} className="mr-3 text-2xl" /> */}
              <button
                type="button"
                className="flex-shrink-0 h-10 px-6 py-2 mr-3 text-sm font-medium text-center text-gray-800 bg-white bg-opacity-0 border border-purple-800 hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:bg-purple-300 dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900"
              >
                View more
              </button>
              <button
                type="button"
                className="flex-shrink-0 h-10 px-4 py-2 text-sm font-medium text-center text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900"
              >
                Go to Website
              </button>
            </div>
            <div className="hidden mt-4 sm:flex md:justify-end md:items-end ">
              <div className="flex">
                {/* <FontAwesomeIcon icon={faHeart} className="text-2xl mr-14 " /> */}
                <button
                  type="button"
                  className="max-w-4xl px-6 py-2 mr-3 text-sm font-medium text-center text-gray-800 bg-white bg-opacity-0 border border-purple-800 hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:bg-purple-300 dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900"
                >
                  View more
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-center text-white bg-purple-800 hover:bg-purple-900focus:ring-4 focus:outline-none focus:bg-purple-300 dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900"
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
