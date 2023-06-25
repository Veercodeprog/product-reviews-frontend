"use client";


import { useState, useEffect , useRef} from "react";
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

const commentsContainerRef = useRef<HTMLDivElement | null>(null)!;


const [comments, setComments] = useState<Comments[]>([]);
  const [postCommentMessage, setPostCommentMessage] = useState(""); // State variable to store the error message

  const article_id = props.articleId;
  const handlePostComment = async (event: any,commentContent:any,  parentCommentId?: string) => {
    event.preventDefault();
    if (user) {
      const { claims } = user;

      const commentData = {
        content: commentContent,

        related: {
          blogId: article_id,
          parentId: parentCommentId,
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
  commentsContainerRef.current?.scrollTo({
    top: commentsContainerRef.current.scrollHeight,
    behavior: 'smooth',
  });
}, [comments]);


  useEffect(() => {
    getAllArticleComments(article_id)
      .then((commentsData) => {
        setComments(commentsData);
      })
      .catch((error) => {
        console.error("Error getting comments:", error);
      });
  }, [article_id]);

  
  const rootComments = comments?.filter((c:any) => !c.data.comment.related.parentId);

  return (
<div className="comments-container " ref={commentsContainerRef}>
  {/* Existing code */}

    <div className="ml-32 sm:ml-0 comments-section  ">

    <div className="flex items-center justify-center h-screen ">
      <SessionManager setLoading={setLoading} updateUser={setUser} />
      <div className="container">
        {postCommentMessage && (
          <div className="text-purple-800 text-lg">{postCommentMessage}</div>
        )}

        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            {/* <h5>Number of  Comments</h5>
            <div>Article ID: {props.articleId}</div> */}
          </div>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <div className="comments max-h-96 overflow-y-auto">
  {rootComments && rootComments.map((comment) => (

                <Comment
                  key={comment.id}
                  comment={comment}
                 parentCommentId={comment.id}
                  comments={comments}
                   article_id={article_id}
                     handlePostComment={handlePostComment} // Pass the handlePostComment function as a prop

               />
              ))}
           
           
            </div>
          </div>
        </div>
  <div className=" mb-32">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <CommentForm           
 handlePostComment={handlePostComment} parentCommentId={null} />
          </div>
        </div>
</div>
      </div>
    </div>
</div>
</div>
  );
}
