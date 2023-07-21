import moment from 'moment';


export default function CommentReplies({commentData}:{commentData:any}) {
  const creationTime = moment(commentData.data.comment.createdAt).fromNow();

  return (
<div className="comment-card mb-3 bg-white rounded shadow-md p-4">
  <div className="flex ">
    <div className="flex-shrink-0">
        <img
          className="h-8 w-8 mt-0 rounded-full my-0"
          src="https://images.unsplash.com/photo-1501325087108-ae3ee3fad52f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=f7f448c2a70154ef85786cf3e4581e4b"
          alt=""
        />
    </div>
    <div className="flex-grow-1 ms-2 ms-sm-3">
      <div className="reply-meta flex items-center mb-2 flex-wrap">
        <h6 className="mb-0 me-2 my-0 leading-tight text-black font-medium">{commentData.data.comment.related.authorUser}</h6>
        <span className='text-xs text-gray-400'>{creationTime}</span>
      </div>
      <div className="text-sm">
        {commentData.data.comment.content} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, explicabo pariatur, incidunt porro dolor recusandae sunt tempora ea ut alias, veniam tempore harum sit quasi repudiandae asperiores soluta totam eum?
      </div>
    </div>
  </div>
</div>

)
}

 