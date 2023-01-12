import "./App.css";
import { useEffect, useState } from "react";
import Board from "./components/Board.js";
import NewBoardForm from "./components/NewBoardForm.js";
import NewCardForm from "./components/NewCardForm.js";
import axios from "axios";

// const INITIAL_BOARDS = [
//   {
//     boardId: 1,
//     owner: "Owner name",
//     title: "Board title",
//     card: [],
//   },
//   {
//     boardId: 2,
//     owner: "Another owner name",
//     title: "Second board title",
//     card: [],
//   },
// ];

// const INITIAL_CARDS = [
//   {
//     cardId: 1,
//     message: "Card text",
//     likes_count: 0,
//   },
//   {
//     cardId: 2,
//     message: "Another card text",
//     likes_count: 90,
//   },
// ];

function App() {
  // const initialBoardCopy = INITIAL_BOARDS.map((board) => {
  //   return { ...board };
  // });
  // const initialCardCopy = INITIAL_CARDS.map((card) => {
  //   return { ...card };
  // });

  const [cardData, setCardData] = useState([]);
  const [boardData, setBoardData] = useState([]);

  const URL = "http://localhost:5000/board";

  const getAllBoards = () => {
    axios
      .get(URL)
      .then((response) => {
        console.log("Calling API");
        const boardsAPICopy = response.data.map((board) => {
          return {
            boardId: board.board_id,
            owner: board.owner,
            title: board.title,
            cards: board.cards_list,
          };
        });
        setBoardData(boardsAPICopy);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(getAllBoards, []);

  // onClick({displayAllCardsForOneBoard})
  const displayAllCardsForOneBoard = (boardId) => {
    axios.get(`${URL}/${boardId}/card`).then((response) => {
      return {
        cards: response.data,
      };
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

  // const nextId = Math.max(...newCardList.map((card) => card.cardId)) + 1;

  //   newCardList.push({
  //     cardId: nextId,
  //     message: newCardInfo.message,
  //     likes_count: 0,
  //   });
  //   setCardData(newCardList);
  // };

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

  // const nextId = Math.max(...newBoardList.map((board) => board.boardId)) + 1;

  //   newBoardList.push({
  //     boardId: nextId,
  //     owner: newBoardInfo.owner,
  //     title: newBoardInfo.title,
  //     card: [],
  //   });
  //   setBoardData(newBoardList);
  // };

  //Need function to connect set of cards to 1 board

  return (
    <div>
      <BoardList
        boardData={boardData}
        cardData={cardData}
        updateLikes={updateLikes}
        displayAllCardsForOneBoard={displayAllCardsForOneBoard}
      />
      <NewBoardForm addBoardFunc={addBoard} />
      <NewCardForm addCardFunc={addCard} />
    </div>
  );
}

export default App;
