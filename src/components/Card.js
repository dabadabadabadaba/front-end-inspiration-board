import "./Card.css";

function Card({ id, description, isLiked }) {
  // const cardsList = [];
  // for (const card of defaultCards) {
  //   cardsList.push(card.description);
  // }
  return (
    <div>
      <ul>
        <li>{description}</li>
        <li>{isLiked}</li>
      </ul>
    </div>
  );
}

export default Card;
