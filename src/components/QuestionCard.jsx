import React from "react";
import { nanoid } from "nanoid/non-secure";

const QuestionCard = (props) => {
  const { question, answers, correct_answer, selected_answer } = props.trivia;
  const { setSelectedAnswer, questionIdx, isChecked } = props;

  const answerButtons = answers.map((answer) => {
    let className = "trivia-btn";

    if (!isChecked && selected_answer === answer) {
      className += " selected";
    } else if (isChecked && answer === correct_answer) {
      className += " correct";
    } else if (
      isChecked &&
      answer !== correct_answer &&
      answer === selected_answer
    ) {
      className += " incorrect";
    }

    console.log(isChecked);

    return (
      <button
        key={nanoid()}
        className={className}
        onClick={() => setSelectedAnswer(questionIdx, answer)}
        disabled={isChecked}
      >
        {answer}
      </button>
    );
  });

  return (
    <div className="question-card">
      <h2 className="question-card-header">{question}</h2>
      <div className="btn-list">{answerButtons}</div>
    </div>
  );
};

export default QuestionCard;
