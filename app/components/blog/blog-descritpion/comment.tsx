import React, { useEffect, useState } from "react";
import CommentForm from "./commentform";
import SessionManager from "@/app/utils/session";
import moment from "moment";
import handlePostComment from "./commentform";
import CommentReplies from "./comment-replies";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply   } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from '@fortawesome/free-regular-svg-icons';

// Assuming you have a function called 'getAllArticleComments' to fetch comments from the API
interface Comment {
  content: string;
  related: {
    blogId: string;
    parentId: string | null;
    authorUser: string;
  };
  blocked: any;
  blockedThread: any;
  blockReason: any;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
  reports: any[];
}

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

import { getAllArticleComments } from "@/app/utils/comments";

const Comment = ({
  comment,
  comments,
  article_id,
  parentCommentId,
  handlePostComment,
}: {
  comment: any;
  comments: any;
  article_id: any;
  parentCommentId: string | null;
  handlePostComment: any; // Add this prop
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setLoading] = useState(true); //    const [comments, setComments] = useState<Comment[]>([]);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
// const heartIcon = isSolidVersion ? faHeart : faHeartRegularAlt;

  const handleReply = () => {
if(showReplyForm){
    setShowReplyForm(!showReplyForm);

}else{
setShowReplyForm(true);
}
    
  };
 const creationTime = moment(comment.data.comment.createdAt).fromNow();
  console.log("parentCommentId:", parentCommentId);
  const childComments = comments.filter(
    (c: any) => c.data.comment.related.parentId === comment.id
  );
  const recentChildComments = childComments.slice(-2); // Get the recent 2 child comments

  const showAllChildComments = childComments.length > 2; 
  return (
 <div className="comment mb-4">
    <div className="comment flex mb-4">
      <SessionManager setLoading={setLoading} updateUser={setUser} />

      {/* Render comment details */}

      <div className="flex-shrink-0">
        <div className="avatar avatar-sm rounded-circle">
          <img
            className="avatar-img w-8 h-8"
            src="https://randomuser.me/api/portraits/women/63.jpg"
            alt=""
          />
        </div>
      </div>




      <div className="flex-shrink-1 ms-2 ms-sm-3">
        <div className="comment-meta flex">
          {/* <h2>Comment Id: {comment.id}</h2> */}
          <h6 className="me-2 text-red-600">
            {comment.data.comment.related.authorUser}
          </h6>

          <span className="text-muted">{creationTime}</span>
        </div>
        <div className="comment-body">{comment.data.comment.content}</div>

        <div className="comment-actions mr-4 mt-5">
          <button className="" onClick={handleReply}><FontAwesomeIcon icon={faReply} /> Reply </button>
          <span className="ml-5"><FontAwesomeIcon icon={faHeart}  /> 

</span>
        </div>

        <div className="comment-replies bg-light p-3 mt-3 rounded">
          <h6 className="comment-replies-title mb-4 text-muted text-uppercase">
           {childComments.length} replies
          </h6>

          {childComments.map((childComment: any) => (
            <CommentReplies key={childComment.id} commentData={childComment} />
          ))}
        </div>

        {showReplyForm && (
          <div className="reply-form">
            <CommentForm
              handlePostComment={handlePostComment}
              parentCommentId={parentCommentId}
            />
          </div>
        )}
      </div>




    </div>
</div>
  );
};

export default Comment;
