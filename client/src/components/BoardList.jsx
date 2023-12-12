import React from 'react';
import BoardCard from './BoardCard';

export default function BoardList(props) {
  const { boards } = props;
  console.log(boards);
  return (
    <div className="quiver">
      {boards.map((boards) => (
        <BoardCard {...boards} key={boards._id} boardId={boards._id} />
      ))}
    </div>
  );
}
