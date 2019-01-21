import React from 'react';

import Comment from './../comment/Comment';

const Comments = ({ comments }) => {
  return (
    <div className="comments">
      {comments.map(comment => {
        return <Comment 
          author={comment && comment.author} 
          post={comment && comment.post}
        />
      })}
    </div>
  )
};

export default Comments;