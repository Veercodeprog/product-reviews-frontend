import React, { useEffect, useState } from "react";
import CommentForm from "./commentform";
import SessionManager from "@/app/utils/session";
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
interface User {
  claims: any
uid:any
}

import { getAllArticleComments } from "@/app/utils/comments";

const Comment = ({ comment, comments, article_id }: { comment: any; comments: any,article_id:any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);//    const [comments, setComments] = useState<Comment[]>([]);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const handleReply = () => {
    setShowReplyForm(true);
  };

  const handlePostComment = async (event: any,commentContent:any) => {
    event.preventDefault();
    if (user) {
      const { claims } = user;
console.log("claims.name:",claims.name || '');
      // const blog_id = props.articleId;
      const commentData = {
        content: commentContent,

        related: {
          blogId: article_id,
          parentId: null,
          authorUser: claims.name,
        },
        blocked: null,
        blockedThread: null,
        blockReason: null,
        approvalStatus: "APPROVED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reports: [],
      };

      try {
        const comment = await postCommentFirestore(commentData);
        if (comment) {
          console.log("Message:", comment);
        //   setPostCommentMessage(comment);
        }
        getAllArticleComments(article_id).then((commentsData) => {
        //   setComments(commentsData);
        });
      } catch (error) {
        console.error("Failed to post comment:", error);
      }
    } else {
      alert("Please login to comment.");
    }
  };

  //  useEffect(() => {
  //     getAllArticleComments(article_id)
  //       .then((commentsData) => {
  //         setComments(commentsData);
  //       })
  //       .catch((error) => {
  //         console.error("Error getting comments:", error);
  //       });
  //   }, [article_id]);

  const childComments = comments.filter(
    (c: any) => c.data.comment.related.parentId === comment.id
  );

  return (
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
          <h2>Comment Id: {comment.id}</h2>
          <h6 className="me-2 text-red-600">{comment.data.comment.related.authorUser}</h6>

          <span className="text-muted">4d</span>
        </div>
        <div className="comment-body">{comment.data.comment.content}</div>
 <div className="comment-actions">
        <button onClick={handleReply}>Reply</button>
        <span>{comment.data.comment.likeCount} Likes</span>
      </div>
        <div className="comment-replies bg-light p-3 mt-3 rounded">
          <h6 className="comment-replies-title mb-4 text-muted text-uppercase">
            2 replies {childComments.length} replies
          </h6>

          <div className="reply flex mb-4">
            <div className="flex-shrink-0">
              <div className="avatar avatar-sm rounded-circle">
                <img
                  className="avatar-img w-8 h-8"
                  src="https://images.unsplash.com/photo-1501325087108-ae3ee3fad52f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=f7f448c2a70154ef85786cf3e4581e4b"
                  alt=""
                />
              </div>
            </div>
            <div className="flex-grow-1 ms-2 ms-sm-3">
              <div className="reply-meta flex items-baseline">
                <h6 className="mb-0 me-2">Brandon Smith</h6>
                <span className="text-muted">2d</span>
              </div>
              <div className="reply-body">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </div>
            </div>
          </div>
          <div className="reply flex">
            <div className="flex-shrink-0">
              <div className="avatar avatar-sm rounded-circle">
                <img
                  className="avatar-img w-8 h-8"
                  src="https://randomuser.me/api/portraits/men/4.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="flex-grow-1 ms-2 ms-sm-3">
              <div className="reply-meta flex items-baseline">
                <h6 className="mb-0 me-2">James Parsons</h6>
                <span className="text-muted">1d</span>
              </div>
              <div className="reply-body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Distinctio dolore sed eos sapiente, praesentium.
              </div>
            </div>
          </div>
        </div>
        {/* {childComments.length > 0 && (
          <div className="comment-replies bg-light p-3 mt-3 rounded">
            <h6 className="comment-replies-title mb-4 text-muted text-uppercase">
              {childComments.length} replies
            </h6>
            {childComments.map((childComment:any) => (
              <Comment
                key={childComment.id}
                comment={childComment}
                comments={comments}
              />
            ))}
          </div>
        )} */}

 {showReplyForm && (
        <div className="reply-form">
          <CommentForm handlePostComment={handlePostComment} />
        </div>
      )}

      </div>
    </div>
  );
};

export default Comment;
