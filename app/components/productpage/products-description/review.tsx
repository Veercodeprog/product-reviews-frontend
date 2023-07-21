import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewForm from "./review-form";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useState } from "react";
import ReviewReplies from "./review-replies";
import SessionManager from "@/app/utils/session";
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
export default function Review({
  review,
  parentReviewId,
  reviews,
  productId,
  handlePostReview,
}: {
  review: any;
  parentReviewId: any;
  reviews: any;
  productId: any;
  handlePostReview: any;
}) {
  const [reviewLike, setReviewLike] = useState(false);

  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setLoading] = useState(true); //    const [comments, setComments] = useState<Comment[]>([]);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  // const heartIcon = isSolidVersion ? faHeart : faHeartRegularAlt;

  const handleReply = () => {
    if (showReplyForm) {
      setShowReplyForm(false);
    } else {
      setShowReplyForm(true);
    }
  };
  const creationTime = moment(review.createdAt).fromNow();
  const comment = review.comment;
  function getCommentTitle(comment: string) {
    const words = comment?.split(" ");
    const titleWords = words.slice(0, 3);
    return titleWords.join(" ");
  }

  const childReviews = reviews.filter(
    (r: any) => r.parentId === review.review_id
  );
  const recentChildReviews = childReviews.slice(-2); // Get the recent 2 child comments

  const showAllChildReviews = childReviews.length > 2;

  return (
    <>
      <div>
        <SessionManager setLoading={setLoading} updateUser={setUser} />

       <div key={review.review_id} className="flex items-start rounded-lg p-4 my-5 gap-5">
  {/* User Profile Image  */}
  <div className="py-10 flex-none">
    <img
      className="h-12  w-12 rounded-full object-cover"
      src={review.claims?.profileImage}
      alt="User Profile"
    />
  </div>
  <div className="py-10 border-t border-gray-400 flex-1">
    {/* Render the review data */}
    <div className="mb-3">
      <p className="text-lg font-bold  leading-tight">{review.claims?.name || null}</p>
      <span className="text-muted text-xs">Added on: {creationTime}</span>
    </div>
    <p className="text-lg font-bold">{getCommentTitle(review.comment)}</p>
    <div className="star-rating mt-3">
      <p>
        {/* Rating:{" "} */}
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={star <= review.rating ? solidStar : regularStar}
            className={`text-yellow-400 text-2xl star ${star <= review.rating ? "solid" : ""}`} 
          />
        ))}
      </p>
    </div>
    <div className="comment-actions mr-4 mt-5">
      <button className="" onClick={handleReply}>
        <FontAwesomeIcon icon={faReply} /> Reply{" "}
      </button>
      {/* {!reviewLike ? (
<button className="" onClick={()=> setReviewLike(!reviewLike)}>
      <span className="ml-5"><FontAwesomeIcon icon={regularHeart}  /> 

</span>
</button>
) : (
<button className="" onClick={()=> setReviewLike(!reviewLike)}>
      <span className="ml-5"><FontAwesomeIcon icon={regularHeart}  /> 

</span>
</button>

) } */}
    </div>
  </div>
</div>
  {showReplyForm && (
          <div className="ml-5 reply-form">
            <ReviewForm
              handleReviewSubmit={handlePostReview}
              parentReviewId={parentReviewId}
            />
          </div>
        )}

        {/* reply */}
        {childReviews.map((review: any) => (
          <ReviewReplies key={review.review_id} reviewData={review} />
        ))}
      
      </div>
    </>
  );
}
