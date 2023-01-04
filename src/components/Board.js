import PropTypes from "react";
import Card from "./Card";

function Board({ cardData }) {
  const cardComponents = [];
  const cardsList = cardData;

  for (const card of cardsList) {
    console.log(card);
    cardComponents.push(
      <Card
        key={card.id}
        id={card.id}
        message={card.message}
        likes_count={card.likes_count}
      />
    );
  }
  return <div>{cardComponents}</div>;
}
// Board.propTypes = {
//   cardsList: PropTypes.arrayOf(
//     PropTypes.shape({
//       // id: PropTypes.number.isRequired,
//       description: PropTypes.string.isRequired,
//       isLiked: PropTypes.bool.isRequired,
//     })
// ),
//};

export default Board;
