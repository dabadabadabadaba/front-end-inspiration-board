import "./App.css";
import { useEffect, useState } from "react";
// import Board from "./components/Board.js";
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

  const URL = "http://127.0.0.1:5000/board";

  const getAllBoards = () => {
    axios
      .get(URL)
      .then((response) => {
        // console.log("Calling API");
        const boardsAPICopy = response.data.map((board) => {
          return {
            boardId: board.board_id,
            owner: board.owner,
            title: board.title,
            cards: board.cards,
          };
        });
        // console.log("console of boardAPICopy", boardsAPICopy);
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
      .get(`${URL}/${boardId}/card`) //can we change route to "cards"?
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
    axios
      .post(`${URL}/${boardId}/card`, newCardInfo)
      .then((response) => {
        console.log(boardId);

        // find the board that corresponds to boardId (in the boardState "boardData")
        // update that board's cards with newCardsList
        //setBoardData to updated boards
        boardData.forEach((board, i) => {
          if (board.boardId === boardId) {
            // find the board that corresponds to boardId
            // pre-populate newCardList with the cards in list in board
            // push message from new card (with id and likes from database) to newCardlist
            const newCardList = [...board.cards];
            console.log("response", response.data.card.card_id);
            newCardList.push({
              card_id: response.data.card.card_id, //99
              message: response.data.card.message, //TODO what should this be?? //"hardcoded"
              likes_count: response.data.card.likes_count, //100
            });
            // set newCardList as valiu of "cards" in new board
            // assign newBoard to boardData
            const newBoard = {
              ...board,
              cards: newCardList,
            };
            boardData[i] = newBoard;
            console.log("logging boardData", boardData);
            setBoardData(boardData);
          }
        });
      })
      .catch((error) => {
        console.log(error);
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

  // Need a function to select 1 board - currently in Board
  // Render the selected board here in App

  return (
    <div>
      <header>
        <h1>Inspiration Board</h1>
      </header>
      <BoardList
        boardData={boardData}
        cardData={cardData}
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
        updateLikes={updateLikes}
        displayAllCardsForOneBoard={displayAllCardsForOneBoard}
      />
      <NewBoardForm addBoardFunc={addBoard} />
      <NewCardForm
        addCardFunc={addCard}
        selectedBoard={selectedBoard}
        boardData={boardData}
        setBoardData={setBoardData}
      />
      <h2> {selectedBoard.cards.message}</h2>
    </div>
  );
}

export default App;
