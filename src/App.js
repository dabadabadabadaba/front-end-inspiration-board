import "./App.css";
import { useState } from "react";
import Board from "./components/Board.js";

function App() {
  const [cardData, setCardData] = useState([
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
  ]);

  //Once we have data from back-end, make sure to copy it
  // and then assign it to useState!

  //Need function to update likes, making a patch request to database

  //Need function to connect set of cards to 1 board

  //Need function for creating a new board 

  //Need function for creating a new card



  return (
    <div>
      <Board cardData={cardData} />
    </div>
  );
}

export default App;
