import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserProvider';
import BoardForm from './BoardForm';
import BoardList from './BoardList';
import "../Styles/Profile.css"
import { Link } from 'react-router-dom';

export default function profile() {
  const {
    user: { username },
    boards,
    addBoard,
    getUserBoard,
  } = useContext(UserContext);

  useEffect(() => {
    getUserBoard();
  }, []);
  return (
    <div className="profile-container">
      <div className="section section-left">
        <h1>welcome {username}</h1>
        <h3>Would you like to add to your quiver?</h3>
        <BoardForm addBoard={addBoard} />
      </div>
      <div className="section section-right">
        <h3>Here is your Quiver</h3>

        <BoardList boards={boards} />
      </div>
    </div>
  );
}

