import PropTypes from "prop-types";
import Card from "./Card";

function Board({
  displayAllCardsForOneBoard,
  boardData,
  cardData,
  updateLikes,
}) {
  const cardComponents = [];
  const cardsList = cardData;

  for (const card of cardsList) {
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

  const boardComponents = [];
  const boardList = boardData;

  for (const board of boardList) {
    boardComponents.push(board.owner, board.title, board.card);
  }
  for (const board of boardComponents) {
  }
  return (
    <div>
      <ul>
        {cardComponents}
        {boardComponents}
      </ul>
    </div>
  );
}
Board.propTypes = {
  cardsList: PropTypes.arrayOf(
    PropTypes.shape({
      cardId: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likes_count: PropTypes.number.isRequired,
    })
  ),
  updateLikes: PropTypes.func.isRequired,
};

export default Board;
