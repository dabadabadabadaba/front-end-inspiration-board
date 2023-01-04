import PropTypes from "prop-types";
import Card from "./Card";

function Board({ cardData, updateLikes }) {
  const cardComponents = [];
  const cardsList = cardData;

  for (const card of cardsList) {
    console.log(card);
    cardComponents.push(
      <Card
        key={card.cardId}
        id={card.cardId}
        message={card.message}
        likes_count={card.likes_count}
        updateLikes={updateLikes}
      />
    );
  }
  return <div>{cardComponents}</div>;
}
Board.propTypes = {
  cardsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likes_count: PropTypes.number.isRequired,
    })
  ),
  updateLikes: PropTypes.func.isRequired
};

export default Board;
