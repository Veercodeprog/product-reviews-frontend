import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
const ReviewForm = ({ handleReviewSubmit, parentReviewId  }:{ handleReviewSubmit:any, parentReviewId:any }) => {

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
const handleSubmit = (event:any) => {
    event.preventDefault();
    handleReviewSubmit(event, reviewText, parentReviewId,rating);
 setReviewText("");
    setRating(0);
  };
  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };
return (
  <form className="mt-4 mb-8" onSubmit={handleSubmit}>
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
                className=" bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium  text-white text-sm px-4 py-2 text-center  dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900"
              >
                Submit
              </button>
            </div>
          </div>
        </form>

)
}
export default ReviewForm;