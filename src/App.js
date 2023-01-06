import "./App.css";
import { useState } from "react";
import Board from "./components/Board.js";
import NewBoardForm from "./components/NewBoardForm.js";
import NewCardForm from "./components/NewCardForm.js";

const INITIAL_BOARDS = [
  {
    boardId: 1,
    owner: "Owner name",
    title: "Board title",
    card: [],
  },
  {
    boardId: 2,
    owner: "Another owner name",
    title: "Second board title",
    card: [],
  },
];

const INITIAL_CARDS = [
  {
    cardId: 1,
    message: "Card text",
    likes_count: 0,
  },
  {
    cardId: 2,
    message: "Another card text",
    likes_count: 90,
  },
];

function App() {
  const initialCardCopy = INITIAL_CARDS.map((card) => {
    return { ...card };
  });

  const [cardData, setCardData] = useState(initialCardCopy);

  //Need to make a patch request to database (when ready)
  const updateLikes = (cardId, updatedLikes) => {
    console.log("updateLikes called");
    const newCardsList = [];
    for (const card of cardData) {
      console.log(`Card.id is ${card.id} and cardId is ${cardId}`);
      if (card.cardId !== cardId) {
        newCardsList.push(card);
      } else {
        const newCard = {
          ...card,
          likes_count: updatedLikes,
        };
        console.log(newCard);
        newCardsList.push(newCard);
      }
    }
    setCardData(newCardsList);
  };

  //Function to create new card
  const addCard = (newCardInfo) => {
    const newCardList = [...cardData];

    const nextId = Math.max(...newCardList.map((card) => card.cardId)) + 1;

    newCardList.push({
      cardId: nextId,
      message: newCardInfo.message,
      likes_count: 0,
    });
    setCardData(newCardList);
  };

  const initialBoardCopy = INITIAL_BOARDS.map((board) => {
    return { ...board };
  });

  const [boardData, setBoardData] = useState(initialBoardCopy);

  // Function to create new board
  const addBoard = (newBoardInfo) => {
    const newBoardList = [...boardData];

    const nextId = Math.max(...newBoardList.map((board) => board.boardId)) + 1;

    newBoardList.push({
      boardId: nextId,
      owner: newBoardInfo.owner,
      title: newBoardInfo.title,
      card: [],
    });
    setBoardData(newBoardList);
  };

  //Need function to connect set of cards to 1 board

  return (
    <div>
      <Board
        boardData={boardData}
        cardData={cardData}
        updateLikes={updateLikes}
      />
      <NewBoardForm addBoardFunc={addBoard} />
      <NewCardForm addCardFunc={addCard} />
    </div>
  );
}

export default App;
