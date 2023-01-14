import Board from "./Board";
import React from "react";
import PropTypes from "prop-types";

function BoardList({
  boardData,
  cardData,
  updateLikes,
  displayAllCardsForOneBoard,
  setSelectedBoard,
}) {
  const ListofBoards = [];

  for (const board of boardData) {
    ListofBoards.push(
      <Board
        key={board.boardId}
        boardId={board.boardId}
        owner={board.owner}
        title={board.title}
        cards={board.cards}
        cardData={cardData}
        setSelectedBoard={setSelectedBoard}
        displayAllCardsForOneBoard={displayAllCardsForOneBoard}
      />
    );
  }
  console.log(cardData);
  return (
    <div>
      <ul
      //   onChange={() => {
      //     displayAllCardsForOneBoard();
      //   }}
      >
        {ListofBoards}
      </ul>
    </div>
  );
}

export default BoardList;
