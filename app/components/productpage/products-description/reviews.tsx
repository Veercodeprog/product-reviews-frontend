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

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
const [reviews, setReviews] = useState<any[]>([]);


 useEffect(() => {
    getAllReviewByProduct(props.product.product_id)
      .then((reviewsData:any) => {
        setReviews(reviewsData);
        if (reviewsData.length > 0) {
          fetchUserClaimsForReviews(reviewsData);
        }
      })
      .catch((error) => {
        console.error("Error getting reviews:", error);
      });
  }, [props.product.product_id]);

console.log("reviews:", reviews);
  const handleReviewSubmit = async(event: any) => {
    event.preventDefault();
    if (user) {
      const reviewData = {
        user_id: user.uid,
        product_id: props.product.product_id,
        rating: rating,
        text: reviewText,
      };

const result:any = await addProductReviews(reviewData);
      console.log("reviewData:", result);
    fetchUserClaimsForReviews([...reviews, result]);

 setReviews([...reviews, result]);
 setReviewText("");
    setRating(0);
      // Call the onPostReview callback with the review data
    } else {
      // User is not logged in, display a message to prompt login
      alert("Please login to add a product.");
      // You can also redirect the user to the login page
      // or show a modal with login options
    }
  };
  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };


  const fetchUserClaimsForReviews = async (reviewsData: any[]) => {
    const reviewsWithClaims = await Promise.all(
      reviewsData.map(async (review: any) => {
        try {
          const claims = await fetchUserClaims(review.user_id);
            const userWithClaims = { ...review, claims: { ...claims, name: claims.name } };
console.log("userWithClaims:", userWithClaims);
        return userWithClaims;
      } catch (error) {
          console.error("Failed to fetch user claims for review", error);
          return review;
        }
      })
    );
    setReviews(reviewsWithClaims);
  };

  return (
    <>
      <SessionManager updateUser={setUser} setLoading={setLoading} />
      <div className="w-full px-20">
       
        <h1 className="text-2xl font-bold mb-4">Reviews</h1>


{reviews.map((review: any) => (
  <div key={review.review_id} className="flex items-center rounded-lg  p-4 my-5">
    {/* User Profile Image */}
    <div className="rounded-full overflow-hidden h-12 w-12 flex-shrink-0">
      <img
        className="h-full w-full object-cover"
        src={review.claims?.profileImage || "default-profile-image.jpg"}
        alt="User Profile"
      />
    </div>
    <div className="ml-12">
      {/* Render the review data */}
      <p>User: {review.claims?.name || null}</p>
<p></p>
      <p>{review.comment}</p>
      <div className="star-rating">
        <p>
          Rating:{" "}
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={star <= review.rating ? solidStar : regularStar}
              className={`star ${star <= review.rating ? "solid" : ""}`}
              style={{ fontSize: "24px" }}
            />
          ))}
        </p>
      </div>
    </div>
  </div>
))}




        {/* Comment form */}
        <form className="mt-4 mb-20" onSubmit={handleReviewSubmit}>
          <h2 className="text-lg font-semibold mb-2">Add a Review</h2>
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-12 h-12 rounded-full"
                src="https://via.placeholder.com/50"
                alt="User Avatar"
              />
            </div>
            <div className="flex-grow">
              <textarea
                className="w-full h-20 p-2 border border-gray-300 rounded"
                placeholder="Write your comment..."
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
              />
              {/* Star rating component */}
              <div className="star-rating">
                {/* {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? "selected" : ""}`}
                  onClick={() => handleStarClick(star)}
                >
                  ★
                </span>
              ))} */}

                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={star <= rating ? solidStar : regularStar}
                    className={`star ${star <= rating ? "solid" : ""}`}
                    onClick={() => handleStarClick(star)}
                    style={{ fontSize: "24px" }} // Adjust the size as per your requirement
                  />
                ))}
              </div>

              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
