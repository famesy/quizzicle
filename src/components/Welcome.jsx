import React from "react";
import Stage from "./data.js";

const Welcome = (props) => {
  const changeStage = props.changeStage;

  return (
    <div className="welcome-page">
      <h1 className="welcome-header">Quizzical</h1>
      <p className="welcome-description">Prepare for the challenge!</p>
      <button className="btn" onClick={() => changeStage(Stage.QUESTIONS)}>
        Start quiz
      </button>
    </div>
  );
};

export default Welcome;
