import PropTypes from "prop-types";
import "./Card.css";
import Likes from "./Likes";

const Card = ({ cardId, message, likes_count }) => {
  return (
    <div>
      <ul>
        <li>{message}</li>
        <Likes />
        {/* <li>{likes_count}</li> */}
      </ul>
    </div>
  );
};

//Need function to add likes (this should be a func passed down as a prop from APP)

export default Card;

Card.propTypes = {
  //need to add functions
};
