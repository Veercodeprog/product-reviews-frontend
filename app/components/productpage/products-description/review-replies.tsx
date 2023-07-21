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
 const comment = reviewData.comment;
  function getCommentTitle(comment: string) {
    const words = comment.split(" ");
    const titleWords = words.slice(0, 3);
    return titleWords.join(" ");
  }
  return (
<div key={reviewData.review_id} className="ml-20  flex items-start rounded-lg ">
  {/* User Profile Image */}
  <div className="rounded-full overflow-hidden h-12 w-12 flex-shrink-0 mt-1">
    <img
      className="h-full w-full object-cover"
      src={reviewData.claims?.profileImage}
      alt="User Profile"
    />
  </div>
  <div className="ml-12">
    {/* Render the review data */}
    <div className="mb-4">
      <p className="text-lg font-bold">{reviewData.claims?.name || null}</p>
      <span className="text-muted">Added on: {creationTime}</span>
    </div>
    <p className="text-lg font-bold">{getCommentTitle(reviewData.comment)}</p>
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
  
  </div>
</div>
  )

}


