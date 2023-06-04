import moment from 'moment';


export default function CommentReplies({commentData}:{commentData:any}) {
  const creationTime = moment(commentData.data.comment.createdAt).fromNow();

  return (
<div className="comment-card mb-4 bg-white rounded shadow-md p-4">
  <div className="reply flex">
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
        <h6 className="mb-0 me-2">{commentData.data.comment.related.authorUser}</h6>
        <span>{creationTime}</span>
      </div>
      <div className="reply-body">
        {commentData.data.comment.content}
      </div>
    </div>
  </div>
</div>

)
}

 