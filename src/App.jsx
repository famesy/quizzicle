import { useState } from "react";
import Welcome from "./components/Welcome";
import Question from "./components/Question.jsx";
import Stage from "./components/data.js";

function App() {
  const [stage, setStage] = useState(Stage.WELCOME);

  function changeStage(nextStage) {
    console.log(`Change to ${nextStage}`);
    setStage(nextStage);
  }

  function renderCondition() {
    if (stage === "WELCOME") {
      return <Welcome changeStage={changeStage} />;
    } else if (stage === "QUESTIONS") {
      return <Question changeStage={changeStage} isChecked={false} />;
    } else if (stage === "RESULTS") {
      return <Question changeStage={changeStage} isChecked={true} />;
    } else {
      return <></>;
    }
  }

  return <section className="app">{renderCondition()}</section>;
}

export default App;
