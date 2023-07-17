"use client";
import SessionManager from "@/app/utils/session";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as solidThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getAllReviewByProduct } from "@/app/utils/postDataApi";
import {
  getAllLikesByProduct,
  addProductLikes,
  removeProductLikes,
} from "@/app/utils/postDataApi";
interface Product {
  product_id: number;
  // Other product properties...
}
export default function ProductDetail(props: any) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [likes, setLikes] = useState<any>([]);
  const [liked, setLiked] = useState<boolean>();
  console.log("likes:", likes);

  useEffect(() => {
    getAllReviewByProduct(props.product?.product_id)
      .then((reviewsData) => {
        setReviews(reviewsData);
      })
      .catch((error) => {
        console.error("Error getting reviews:", error);
      });
  }, [props.product?.product_id]);

  useEffect(() => {
    getAllLikesByProduct(props.product?.product_id)
      .then((likesData: any[]) => {
        setLikes(likesData);
        // Check if the current user has liked the product
        // if (user) {
        //   const hasLiked = likes.some((like:any) => like.user_id === user?.uid);
        //   setLiked(hasLiked);
        // } else {
        //   setLiked(false);
        // }
      })
      .catch((error) => {
        console.error("Error getting likes:", error);
      });
  }, [likes]);

  // if(user){
  //       const hasLiked = likes.some((like) => like.user_id === user?.uid);
  //       setLiked(hasLiked);
  // }
  const handleLikes = async (event: any) => {
    event.preventDefault();
    if (user) {
      if (liked) {
        // User has already liked the product, remove the like
        const result = await removeProductLikes(
          user.uid,
          props.product.product_id
        );
        setLiked(false);
        console.log("Remove Like result:", result);
      } else {
        // User has not liked the product, add the like
        const result = await addProductLikes(
          user.uid,
          props.product.product_id
        );
        setLiked(true);
        console.log("Add Like result:", result);
      }
      // setLiked(!liked); // Toggle the liked state
    } else {
      // User is not logged in, display a message to prompt login
      alert("Please login to add a product.");
      // You can also redirect the user to the login page
      // or show a modal with login options
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 ">
      {/* {props.product.product_id} */}
      <SessionManager updateUser={setUser} setLoading={setLoading} />

      <div className="col-span-2">
      <img
        src="https://dummyimage.com/200x150/000/fff.jpg"
        width={200}
        height={150}
        alt="..."
        className="w-[100%]"
      />
      </div>
      <div className="col-span-3 mt-4 lg:mt-6 ">
        <div className="flex-shrink-0">
          <h2 className="page-headings font-bold text-left mb-2 whitespace-nowrap">
            {props.product?.name}
          </h2>
        </div>
        <p className="card-text para leading-normal mt-5">
          {props.product?.short_description}
        </p>
       

        <div
          className="text-left gap-3 flex flex-wrap items-center sm:items-end my-4 "
          role="group"
          aria-label="Tools"
        >
           <div className="card--stats flex items-center">
          <FontAwesomeIcon
            icon={liked ? solidHeart : regularHeart}
            className="items-start w-[20px] mr-2"
          />

          <span className="gray mr-2">{reviews && reviews.length}</span>
          <span className="gray">Reviews</span>
        </div>
          <button
            type="button"
            className="flex items-center bg-white text-gray-700 border border-gray-300 rounded-full font-medium px-3 w-auto h-6 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-900 dark:focus:ring-gray-700"
            style={{ lineHeight: "0.8" }}
            onClick={handleLikes}
          >
            <FontAwesomeIcon
              icon={liked ? solidThumbsUp : regularThumbsUp}
              className="mr-1"
            />
            {likes && likes.length}
          </button>

          <button
            type="button"
            className="bg-white text-gray-700 border border-gray-300 rounded-full font-medium px-3 w-auto h-6 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-900 dark:focus:ring-gray-700"
            style={{ lineHeight: "0.8" }}
          >
            Blogging
          </button>
          <button
            type="button"
            className="bg-white text-gray-700 border border-gray-300 rounded-full font-medium px-3 w-auto h-6 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-900 dark:focus:ring-gray-700"
            style={{ lineHeight: "0.8" }}
          >
            All
          </button>
        </div>
      </div>
    </div>
  );
}
