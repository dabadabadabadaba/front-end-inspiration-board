import "./Card.css";

function Card({ id, message, likes_count }) {
  // const cardsList = [];
  // for (const card of defaultCards) {
  //   cardsList.push(card.description);
  // }
  return (
    <div>
      <ul>
        <li>{message}</li>
        <li>{likes_count}</li>
      </ul>
    </div>
  );
}

export default Card;
