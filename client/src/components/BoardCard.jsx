import React from 'react';
import { Link, Route } from 'react-router-dom';
import Rating from './Rating';
import { UserContext } from '../Context/UserProvider';
import SurfboardDetail from './surfboardDetail';
import "../Styles/boardCard.css"
import { useContext } from 'react';
export default function BoardCard(props, { cardData }) {
  const { model, shaper, size, image, _id, rating } = props;
  // const handleRatingChange = (newRating) => {
  //   const response
  // };

  const { deleteBoard } = useContext(UserContext)

  return (
    <div className="card-wrap">
      {/* <button onClick={() => deleteBoard(surfboard._id)}>delete</button> */}
      <Link className='card-link' to={`/surfboard/${_id}`}>

        <h1 className="card-shaper">{shaper}</h1> 
        <h2 className="card-model">{model}</h2>
        <h3 className="card-size">{size}</h3>
        <img className="card-img" src={image} />
      </Link>

      <Rating className="Rating" value={rating.score} />
    </div>
  );
}

//need to make detailed view and rating system
