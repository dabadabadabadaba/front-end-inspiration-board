import Board from "./Board";
import React from "react";
import PropTypes from "prop-types";

function BoardList({
  boardData,
  cardData,
  updateLikes,
  displayAllCardsForOneBoard,
}) {
  const ListofBoards = [];

  for (const board of boardData) {
    ListofBoards.push(
      <Board
        key={board.boardId}
        boardId={board.boardId}
        owner={board.owner}
        title={board.title}
        card={board.card}
      />
    );
  }

  return (
    <div>
      <ul
        onClick={() => {
          displayAllCardsForOneBoard();
        }}
      ></ul>
    </div>
  );
}
