import React, { useEffect, useState } from "react";

// Assuming you have a function called 'getAllArticleComments' to fetch comments from the API
import { getAllArticleComments } from "@/app/utils/comments";


const Comment = ({ comment, comments }:{ comment:any , comments:any}) => {
// const [comments, setComments] = useState<Comment[]>([]);

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
    (c:any) => c.data.comment.related.parentId === comment.id
  );

  return (
    <div className="comment flex mb-4">
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
          <h6 className="me-2">{comment.data.comment.related.authorUser}</h6>
 
          <span className="text-muted">4d</span>
        </div>
        <div className="comment-body">{comment.data.comment.content}</div>
 + <div className="comment-replies bg-light p-3 mt-3 rounded">
                    <h6 className="comment-replies-title mb-4 text-muted text-uppercase">
                      2 replies
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
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit.
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
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Distinctio dolore sed eos sapiente, praesentium.
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
      </div>
    </div>
  );
};

export default Comment;
