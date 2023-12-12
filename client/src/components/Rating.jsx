import React, { useState, useContext } from 'react';
import "../Styles/Rating.css"
const Rating = () => {
  const [rating, setRating] = useState();

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${value <= rating ? 'selected' : ''}`}
          onClick={() => handleStarClick(value)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default Rating;
