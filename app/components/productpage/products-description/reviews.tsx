"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addProductReviews } from "@/app/utils/postDataApi";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import SessionManager from "@/app/utils/session";
import { getAllReviewByProduct } from "@/app/utils/postDataApi";
import moment from "moment";
import { fetchUserClaims } from "@/app/utils/auth";
import ReviewForm from "./review-form";
import Review from "./review";
type UserType = {
  claims: {
    id: number;
    name: string;
    role: string;
    email: string;
  };
  uid: string;
  // Add other properties as needed
};



export default function Reviews(props: any) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setLoading] = useState(false);

  // const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
const [reviews, setReviews] = useState<any[]>([]);

const product_id = props.product?.product_id;
 useEffect(() => {
    getAllReviewByProduct(props.product?.product_id)
      .then((reviewsData:any) => {
        setReviews(reviewsData);
        if (reviewsData.length > 0) {
          fetchUserClaimsForReviews(reviewsData);
        }
      })
      .catch((error) => {
        console.error("Error getting reviews:", error);
      });
  }, [props.product?.product_id]);

// console.log("reviews:", reviews);
  const handleReviewSubmit = async(event: any,reviewText:any,parentReviewId: number ,rating:any) => {
    event.preventDefault();
    if (user) {
      const reviewData = {
        user_id: user.uid,
        product_id: props.product.product_id,
        rating: rating,
        text: reviewText,
        parent_review_id: parentReviewId,
approvalStatus: "APPROVED",
  createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

const result:any = await addProductReviews(reviewData);
      console.log("reviewData:", result);
    fetchUserClaimsForReviews([...reviews, result]);

 setReviews([...reviews, result]);
//  setReviewText("");
    // setRating(0);
      // Call the onPostReview callback with the review data
    } else {
      // User is not logged in, display a message to prompt login
      alert("Please login to add a product.");
      // You can also redirect the user to the login page
      // or show a modal with login options
    }
  };



  const fetchUserClaimsForReviews = async (reviewsData: any[]) => {
    const reviewsWithClaims = await Promise.all(
      reviewsData.map(async (review: any) => {
        try {
          const claims = await fetchUserClaims(review.user_id);
            const userWithClaims = { ...review, claims: { ...claims, name: claims.name } };
// console.log("userWithClaims:", userWithClaims);
        return userWithClaims;
      } catch (error) {
          console.error("Failed to fetch user claims for review", error);
          return review;
        }
      })
    );
    setReviews(reviewsWithClaims);
  };

  const rootReviews = reviews?.filter((r:any) => !r.parentId);
  return (
    <>
      <SessionManager updateUser={setUser} setLoading={setLoading} />
      <div className="w-full px-20">
       
        <h1 className="text-2xl font-bold mb-4">Reviews</h1>


{rootReviews && rootReviews.map((review: any) => (
     <Review
                  key={review.review_id}
                  review={review}
                 parentReviewId={review.review_id}
                  reviews={reviews}
                   productId={product_id}
                     handlePostReview={handleReviewSubmit} 
               />



))}




        {/* Comment form */}
      <ReviewForm           
 handleReviewSubmit={handleReviewSubmit} parentReviewId={null}  />
      
      </div>
    </>
  );
}
