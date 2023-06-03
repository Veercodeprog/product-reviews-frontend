export default function CommentReplies() {
  return (
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
)
}