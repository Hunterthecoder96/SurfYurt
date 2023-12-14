import React, { useState, useContext } from 'react';
import "../Styles/Rating.css"
const Rating = (props) => {
  const {onChange, value} =props;
 

  const handleStarClick = (value) => {
    if(onChange){
      onChange(value);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((number) => (
        <span
          key={number}
          className={`star ${number <= value ? 'selected' : ''}`}
          onClick={()=>handleStarClick(number)}>
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default Rating;
