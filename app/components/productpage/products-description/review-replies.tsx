import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function ReviewReplies({reviewData}:{reviewData:any}) {
const [reviewLike, setReviewLike] = useState(false);
  const creationTime = moment(reviewData.createdAt).fromNow();

  return (
  <div className="ml-20 reply flex items-center rounded-lg  p-4 my-5">
    {/* User Profile Image */}
    <div className="rounded-full overflow-hidden h-12 w-12 flex-shrink-0">
      <img
        className="h-full w-full object-cover"
      src={reviewData.claims?.profileImage }
        alt="User Profile"
      />
    </div>
    <div className="ml-12">
      {/* Render the review data */}
     <p>User: {reviewData.claims?.name || null}</p>
      <p></p>
        <p>{reviewData.comment}</p>
      <div className="star-rating">
        <p>
          Rating:{" "}
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={star <= reviewData.rating ? solidStar : regularStar}
              className={`star ${star <= reviewData.rating ? "solid" : ""}`}
              style={{ fontSize: "24px" }}
            />
          ))}
        </p>
      </div>
 {/* <div className="comment-actions mr-4 mt-5">
        
          <span className="ml-5"><FontAwesomeIcon icon={regularHeart}  /> 

</span>
        </div> */}
    </div>
  </div>
  )

}