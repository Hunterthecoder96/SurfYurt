import React, {useEffect, useState, useContext } from 'react';
import { UserContext } from '../Context/UserProvider';

export default function CommentSection(props) {
  const { comments, newComment, handleChange, addComment } = useContext(UserContext);
  const { surfboardId } = props;


  return (
    <div className="comment-section">
      <div>
        <textarea
          placeholder="add a comment..."
          value={newComment.text}
          name="text"
          className="textarea"
          onChange={handleChange}
        />
        <button onClick={() => addComment(surfboardId)}>Add Comment</button>
      </div>
      <h2>Comments</h2>
      <div className="comment-map">
        {comments
          .filter((comment) => comment.surfboardId === surfboardId)
          .map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-user">
                <p>{comment.user.username}</p> {/* Display username */}
              </div>
              <div className="comment-text">
                {comment.text}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
