import axios from "axios";
import PropTypes from "prop-types";
import Card from "./Card";

function Board({
  boardId,
  owner,
  title,
  cards,
  cardData,
  selectedBoard,
  setSelectedBoard,
  displayAllCardsForOneBoard,
  updateLikes,
}) {
  const cardComponents = [];
  console.log(`Cards${cards}`);
  // const cardsList = cardData;
  const URL = "http://localhost:5000/board";

  for (const card of cardData) {
    // console.log(`Printing card data from board ${card}`);
    cardComponents.push(
      <Card
        key={card.cardId}
        cardId={card.cardId}
        message={card.message}
        likes_count={card.likes_count}
        updateLikes={updateLikes}
      />
    );
  }

  const currentBoard = (boardId) => {
    axios.get(`${URL}/${boardId}`).then((response) => {
      console.log("Calling currentBoard");
      console.log(response.data);
      setSelectedBoard(response.data);
    });
  };

  return (
    <div>
      <li
        onClick={() => {
          displayAllCardsForOneBoard(boardId);
          currentBoard(boardId);
        }}
      >
        {title}
        {owner}
        {cardComponents}
      </li>
    </div>
  );
}
Board.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      cardId: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likes_count: PropTypes.number.isRequired,
    })
  ),
  selectedBoard: PropTypes.shape({
    boardId: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired,
  }),
  updateLikes: PropTypes.func.isRequired,
  displayAllCardsForOneBoard: PropTypes.func.isRequired,
};

export default Board;
