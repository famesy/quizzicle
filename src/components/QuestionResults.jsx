import React from "react";

const QuestionResults = (props) => {
  const { point, resetGame } = props;
  return (
    <div className="question-result">
      <p>You scored 3/5 correct answers</p>
      <button className="btn" onClick={resetGame}>
        Play again
      </button>
    </div>
  );
};

export default QuestionResults;
