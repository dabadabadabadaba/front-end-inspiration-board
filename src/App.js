import "./App.css";
import { useState } from "react";
import Board from "./components/Board.js";

const INITIAL_CARDS = [
  {
    cardId: 1,
    message: "Card text",
    likes_count: 0,
  },
  {
    cardId: 2,
    message: "Another card text",
    likes_count: 0,
  },
];

function App() {
  const initialCopy = INITIAL_CARDS.map((card) => {
    return { ...card };
  });

  const [cardData, setCardData] = useState(initialCopy);

  //Need to make a patch request to database (when ready)
  const updateLikes = (cardId, updatedLikes) => {
    console.log("updateLikes called");
    const newCardsList = [];
    for (const card of cardData) {
      if (card.id !== cardId) {
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

  //Need function to connect set of cards to 1 board

  //Need function for creating a new board

  //Need function for creating a new card

  return (
    <div>
      <Board cardData={cardData} updateLikes={updateLikes} />
    </div>
  );
}

export default App;
