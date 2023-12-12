import React, { useContext, useEffect } from 'react';
import BoardCard from './BoardCard';
import { UserContext } from '../Context/UserProvider';

export default function publicSurfboards() {
  const { publicSurfboards, getAllSurfboards } = useContext(UserContext);
  useEffect(() => {
    getAllSurfboards();
  }, []);
  return (
    <div className="public-wrap">
      {publicSurfboards.map((surfboards) => (
        <BoardCard
          className="publicboards"
          {...surfboards}
          key={surfboards._id}
          surfboardId={surfboards._id}
        />
      ))}
    </div>
  );
}
