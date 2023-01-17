import "./App.css";
import { useEffect, useState } from "react";
import Board from "./components/Board.js";
import NewBoardForm from "./components/NewBoardForm.js";
import NewCardForm from "./components/NewCardForm.js";
import axios from "axios";
import BoardList from "./components/BoardList.js";

function App() {
  const [cardData, setCardData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({
    // try selectedBoard.board_id etc.
    boardId: 0,
    owner: "",
    title: "",
    cards: [],
  });

  const URL = "http://localhost:5000/board";

  const getAllBoards = () => {
    axios
      .get(URL)
      .then((response) => {
        console.log("Calling API");
        const boardsAPICopy = response.data.map((board) => {
          return {
            // ...board,
            boardId: board.board_id,
            owner: board.owner,
            title: board.title,
            cards: board.cards,
          };
        });
        console.log("console of boardAPICopy", boardsAPICopy);
        setBoardData(boardsAPICopy);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getAllBoards, []);

  // onClick({displayAllCardsForOneBoard})
  const displayAllCardsForOneBoard = (boardId) => {
    axios
      .get(`${URL}/${boardId}/card`)
      .then((response) => {
        console.log("Inside display all cards for 1 board");
        console.log(response.data);

        return {
          cards: response.data,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Need to make a patch request to database (when ready)
  const updateLikes = (cardId, updatedLikes) => {
    console.log("updateLikes called");
    const newCardsList = [];
    axios
      .patch(`${URL}/${cardId}`)
      .then((response) => {
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
        console.log("newCardsList consolelog", newCardsList);
        setCardData(newCardsList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Function to create new card
  const addCard = (boardId, newCardInfo) => {
    console.log(boardId);
    console.log(newCardInfo);
    axios.post(`${URL}/${boardId.board_id}/card`).then((response) => {
      console.log(boardId);
      const newCardList = [...cardData];
      newCardList.push({
        cardId: response.data.card_id,
        message: boardId.message,
        likes_count: response.data.likes_count,
      });
      setCardData(newCardList);
    });
  };

  // Function to create new board, needs POST with axios
  const addBoard = (newBoardInfo) => {
    axios
      .post(URL, newBoardInfo)
      .then((response) => {
        getAllBoards();
        const newBoardList = [...boardData];
        const newBoardJSON = {
          ...newBoardInfo,
          boardId: response.data.board_id,
        };
        newBoardList.push(newBoardJSON);
        setBoardData(newBoardList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(cardData);

  //Need function to connect set of cards to 1 board
  // Need a function to select 1 board- not sure if it should be in App or BoardList?
  // Render the selected board here in App

  return (
    <div>
      <BoardList
        boardData={boardData}
        cardData={cardData}
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
        updateLikes={updateLikes}
        displayAllCardsForOneBoard={displayAllCardsForOneBoard}
      />
      <NewBoardForm addBoardFunc={addBoard} />
      <NewCardForm addCardFunc={addCard} />
      <div>{/* <Board /> */}</div>
    </div>
  );
}

export default App;
