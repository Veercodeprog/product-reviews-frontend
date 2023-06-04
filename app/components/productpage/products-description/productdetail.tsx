'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
	import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
	import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getAllReviewByProduct } from "@/app/utils/postDataApi";
export default function ProductDetail({ product }: { product: any }) {
const [reviews, setReviews] = useState();
 useEffect(() => {
    getAllReviewByProduct(product.product_id)
      .then((reviewsData) => {
        setReviews(reviewsData);
     
      })
      .catch((error) => {
        console.error("Error getting reviews:", error);
      });
  }, [product.product_id]);
  return (
 <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <img
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
                  <FontAwesomeIcon icon={regularHeart} className="items-start  mx-8" />
                  
                  <span className="gray mr-2">{reviews?.length}</span>
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

)
}