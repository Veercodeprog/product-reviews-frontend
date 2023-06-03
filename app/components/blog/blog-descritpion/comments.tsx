"use client";
import { useState, useEffect } from "react";
import SessionManager from "@/app/utils/session";
import CommentForm from "./commentform";
import { postCommentFirestore } from "@/app/utils/comments";
import { getAllArticleComments } from "@/app/utils/comments";
import Comment from "./comment";
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
interface Comments {
  id: string; // Add the 'id' property
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


export default function Comments(props: any) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setLoading] = useState(true);



const [comments, setComments] = useState<Comments[]>([]);
  const [postCommentMessage, setPostCommentMessage] = useState(""); // State variable to store the error message

  const article_id = props.articleId;
  // console.log("article_id:", article_id);
  const handlePostComment = async (event: any,commentContent:any) => {
    event.preventDefault();
    if (user) {
      const { claims } = user;
console.log("claims.name:",claims.name);
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
          setPostCommentMessage(comment);
        }
        getAllArticleComments(article_id).then((commentsData) => {
          setComments(commentsData);
        });
      } catch (error) {
        console.error("Failed to post comment:", error);
      }
    } else {
      alert("Please login to comment.");
    }
  };

  useEffect(() => {
    getAllArticleComments(article_id)
      .then((commentsData) => {
        setComments(commentsData);
      })
      .catch((error) => {
        console.error("Error getting comments:", error);
      });
  }, [article_id]);
  console.log("comments:", comments);
  
  const rootComments = comments?.filter((c:any) => !c.data.comment.related.parentId);

  return (
    <div className="flex items-center justify-center h-screen mt-5 mb-40">
      <SessionManager setLoading={setLoading} updateUser={setUser} />
      <div className="container">
        {postCommentMessage && (
          <div className="text-purple-800 text-lg">{postCommentMessage}</div>
        )}

        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <h5>Number of  Comments</h5>
            <div>Article ID: {props.articleId}</div>
          </div>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <div className="comments">
  {rootComments.map((comment) => (

                <Comment
                  key={comment.id}
                  comment={comment}
                  comments={comments}
                   article_id={article_id}
               />
              ))}
              {/* <div className="comment flex mb-4">
                <div className="flex-shrink-0">
                  <div className="avatar avatar-sm rounded-circle">
                    <img
                      className="avatar-img w-8 h-8"
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex-grow-1 ms-2 ms-sm-3">
                  <div className="comment-meta flex items-baseline">
                    <h6 className="me-2">Jordan Singer</h6>
                    <span className="text-muted">2d</span>
                  </div>
                  <div className="comment-body">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Non minima ipsum at amet doloremque qui magni, placeat
                    deserunt pariatur itaque laudantium impedit aliquam eligendi
                    repellendus excepturi quibusdam nobis esse accusantium.
                  </div>

                  <div className="comment-replies bg-light p-3 mt-3 rounded">
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
                </div>
              </div> */}
              {/* <div className="comment flex">
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
                    <h6 className="me-2">Jenna Roberts</h6>
                    <span className="text-muted">4d</span>
                  </div>
                  <div className="comment-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iusto laborum in corrupti dolorum, quas delectus nobis porro
                    accusantium molestias sequi.
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <CommentForm handlePostComment={handlePostComment} />
          </div>
        </div>
      </div>
    </div>
  );
}
