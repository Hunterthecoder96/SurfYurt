import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../Context/UserProvider';
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';
import "../Styles/surfboardDetail.css"

export default function SurfboardDetails() {
  const {
    publicSurfboards,
    getAllSurfboards,
    comments,
    getComments,
    addComment,
  } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    getAllSurfboards();
    getComments();
  }, []);

  const foundSurfboard = publicSurfboards.find(
    (surfboard) => surfboard._id === id
  );

  const filterComments = comments.filter(
    (comment) => foundSurfboard._id === id
  );

  return (
    <div className="detailed-container">
      <h1 className="detail-shaper">{foundSurfboard.shaper}</h1>
      <h2 className="detail-model">{foundSurfboard.model}</h2>
      <h3 className="detail-size">{foundSurfboard.size}</h3>
      <h4 className="detail-rating">{foundSurfboard.rating.score}</h4>
      <img className="detail-image" src={foundSurfboard.image} />
      <h4 className="detail-description">{foundSurfboard.description}</h4>
      <CommentSection
        comments={filterComments}
        onAddComment={addComment}
        surfboardId={id}
      />
    </div>
  );
}
