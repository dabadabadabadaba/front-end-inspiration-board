import "./App.css";
import { useState } from "react";
import Board from "./components/Board.js";

function App() {
  const defaultCards = [
    {
      cardId: 1,
      message: "Card text",
      likes_count: false,
    },
    {
      cardId: 2,
      message: "Another card text",
      likes_count: false,
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
