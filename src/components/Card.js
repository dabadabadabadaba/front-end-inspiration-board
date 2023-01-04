import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ cardId, message, likes_count, updateLikes }) => {
  function addLikes() {
    updateLikes(cardId, likes_count + 1);
  }


  return (
    <div>
      <ul>
        <li>{message}</li>
        <li>{likes_count}</li>
        <button onClick={() => {addLikes()}}>Like!</button>
      </ul>
    </div>
  );
};

//Need function to add likes (this should be a func passed down as a prop from APP)

export default Card;

Card.propTypes = {
  //need to add functions
};
