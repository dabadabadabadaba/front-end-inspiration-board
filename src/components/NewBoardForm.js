import React, { useState } from "react";
import "./NewBoardForm.css";
import PropTypes from "prop-types";

const INITIAL_FORM_DATA = {
  title: "Type Title here",
  owner: "Type Owner name here",
};

const NewBoardForm = (props) => {
  const [boardFormData, setBoardFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    console.log(`handle change called`);
    console.log(
      `Target name: ${e.target.name} Target value: ${e.target.value}`
    );

    const newBoardData = {
      ...boardFormData,
      [e.target.name]: e.target.value,
    };
    setBoardFormData(newBoardData);
  };

  const handleNewBoardSubmit = (e) => {
    e.preventDefault();
    props.addBoardFunc(boardFormData);
  };

  return (
    <form onSubmit={handleNewBoardSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={boardFormData.title}
        onChange={handleChange}
      />

      <label htmlFor="owner">Owner's Name</label>
      <input
        type="text"
        name="owner"
        id="owner"
        value={boardFormData.owner}
        onChange={handleChange}
      />

      <input type="submit" value="Add Board" />
    </form>
  );
};

export default NewBoardForm;
