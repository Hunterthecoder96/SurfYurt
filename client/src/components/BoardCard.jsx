import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { UserContext } from '../Context/UserProvider';
import "../Styles/boardCard.css";

export default function BoardCard({ model, shaper, size, image, _id, rating }) {
  const { deleteBoard } = useContext(UserContext);

  return (
    <div className="card-wrap">
      <button className="delete-btn" onClick={() => deleteBoard(_id)}><span>Delete</span></button>
      <Link className='card-link' to={`/surfboard/${_id}`}>
        <img className="card-img" src={image} alt={`${model} by ${shaper}`} />
        <div className="card-content">
          <h1 className="card-shaper">{shaper}</h1>
          <h2 className="card-model">{model}</h2>
          <h3 className="card-size">{size}</h3>
          <Rating className="Rating" value={rating.score} />
        </div>
      </Link>
    </div>
  );
}

//need to make detailed view and rating system
