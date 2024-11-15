import React, { useEffect, useState } from "react";
import Stage from "./data";
import QuestionCard from "./QuestionCard";
import QuestionResults from "./QuestionResults";
import { nanoid } from "nanoid/non-secure";
import * as he from "he";
import { BlinkBlur } from "react-loading-indicators";

const Question = (props) => {
  const { isChecked } = props;
  const [triviaList, setTriviaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gameReset, setGameReset] = useState(true);
  const changeStage = props.changeStage;

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 3000; // 3 seconds

    async function fetchTrivia() {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
        );
        const data = await res.json();
        const formattedTrivia = [];
        data.results.forEach((trivia) => {
          const correctIdx = Math.floor(Math.random() * 4);
          const answers = [
            ...trivia.incorrect_answers.slice(0, correctIdx),
            trivia.correct_answer,
            ...trivia.incorrect_answers.slice(correctIdx),
          ].map((ans) => he.decode(ans));
          formattedTrivia.push({
            question: he.decode(trivia.question),
            answers: answers,
            correct_answer: trivia.correct_answer,
            selected_answer: null,
          });
        });
        console.log(formattedTrivia);
        setTriviaList(formattedTrivia);
        retryCount = 0; // Reset retry count on success
      } catch (err) {
        console.error(`Can't Fetch Data ${err}`);
        if (retryCount < maxRetries) {
          console.log(
            `Retrying in ${retryDelay}ms... (Attempt ${
              retryCount + 1
            }/${maxRetries})`
          );
          retryCount++;
          setTimeout(() => {
            fetchTrivia();
          }, retryDelay);
        } else {
          console.error("Max retries reached. Giving up.");
          setIsLoading(false);
        }
        return;
      }
      setIsLoading(false);
    }

    if (gameReset) {
      fetchTrivia();
      setGameReset(false);
    }
  }, [gameReset]);

  function checkResult() {
    changeStage(Stage.RESULTS);
  }

  function resetGame() {
    setIsLoading(true);
    setGameReset((prevState) => !prevState);
    changeStage(Stage.QUESTIONS);
  }

  function setSelectedAnswer(questionIdx, answer) {
    setTriviaList((prevTriviaList) => {
      return prevTriviaList.map((trivia, idx) => {
        return idx == questionIdx
          ? { ...trivia, selected_answer: answer }
          : trivia;
      });
    });
  }

  function calculatePoint() {
    let point = 0;
    triviaList.forEach((trivia) => {
      if (trivia.selected_answer === trivia.correct_answer) {
        point += 1;
      }
    });
    return point;
  }

  const questionCards = triviaList.map((trivia, idx) => (
    <QuestionCard
      trivia={trivia}
      questionIdx={idx}
      key={nanoid()}
      setSelectedAnswer={setSelectedAnswer}
      isChecked={isChecked}
    />
  ));

  const isAllSelected = triviaList.every((trivia) => trivia.selected_answer);

  return (
    <div className="question-page">
      {isLoading ? (
        <div className="loading-container">
          <BlinkBlur color="#aaa" size="medium" text="" textColor="" />
        </div>
      ) : (
        <>
          {questionCards}
          {isChecked ? (
            <QuestionResults point={calculatePoint()} resetGame={resetGame} />
          ) : (
            <button
              className="btn"
              onClick={checkResult}
              disabled={!isAllSelected}
            >
              Check answers
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Question;
