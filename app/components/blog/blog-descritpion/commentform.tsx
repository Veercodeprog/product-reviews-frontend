// import exp from "constants";
import React, { useState } from "react";
const CommentForm = ({ handlePostComment, parentCommentId }:{ handlePostComment:any, parentCommentId:any }) => {
  const [commentContent, setCommentContent] = useState("");
const handleSubmit = (event:any) => {
    event.preventDefault();
    handlePostComment(event, commentContent, parentCommentId);
  };

  return (
    <div className="comment-form flex items-center">
      <div className="flex-shrink-0">
        <div className="avatar avatar-sm rounded-circle">
          <img
            className="avatar-img w-8 h-8"
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=200&w=200"
            alt=""
          />
        </div>
      </div>
      <div className="flex-grow-1 ms-2 ms-sm-3 w-full">
        <form>
          <textarea
            className="w-full form-control py-0 px-1 border-0 mt-5"
            placeholder="Start writing..."
            style={{ resize: "none" }}
            // Set the commentContent state variable on input change
            onChange={(event) => setCommentContent(event.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:bg-purple-300 font-medium text-white text-sm px-4 py-2 text-center dark:bg-purple-300 dark:hover:bg-purple-600 dark:focus:bg-purple-900"
            // Pass the commentContent as an argument to the handlePostComment function
           onClick={handleSubmit}
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};
export default CommentForm;