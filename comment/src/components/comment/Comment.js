import React from 'react';

import Avatar from './../../assets/images/avatar.png';
import './Comment.css';

const Comment = ({ author, post }) => {
  return (
    <div className="comment">
      <div className="avatar-wrapper">
        <img className="avatar" src={Avatar} alt="Avatar" />
      </div>
      <div className="comment-info">
        <div className="author-and-time">
          <span className="author">{author}</span>
          <sup className="time">Today at 5:00</sup>
        </div>
        <div className="post">
          {post}
        </div>
      </div>
    </div>
  )
};

export default Comment;