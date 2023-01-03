import "./App.css";
import { useState } from "react";
import Board from "./components/Board.js";

function App() {
  const defaultCards = [
    {
      cardId: 1,
      description: "Card text",
      isLiked: false,
    },
    {
      cardId: 2,
      description: "Another card text",
      isLiked: false,
    },
  ];
  const [cardData, setCardData] = useState([defaultCards]);
  return (
    <div>
      <Board cardData={cardData} />
    </div>
  );
}

export default App;
