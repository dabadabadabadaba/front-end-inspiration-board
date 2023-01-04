import React from "react";
import { useState } from "react";

//Example of event handling
const Likes = () => {
  const [likeCount, setLikeCount] = useState(0); // rendering state

  //state is changed here
  const updateLikes = () => {
    setLikeCount(likeCount + 1);
  };
  // event handler: when the user clicks on "like!", updateLikes will be called
  return (
    <section>
      <p> ❤️{likeCount}</p>
      <button onClick={updateLikes}> Like! </button>
    </section>
  );
};

export default Likes;
