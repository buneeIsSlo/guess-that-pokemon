import "./css/question.css";
import { useEffect, useState, memo } from "react";
import useGameContext from "../hooks/useGameContext";
import { Button } from "@kylum/nes-react";

const Option = memo(({ optName, answer }) => {
  const { dispatch } = useGameContext();
  const [optionStatus, setOptionStatus] = useState(null);
  const [alreadyClicked, setAlreadyClicked] = useState(false);

  const handleClick = () => {
    if (answer === optName) {
      if (alreadyClicked) return;
      setOptionStatus("success");
      dispatch({ type: "animatePoints" });
      setTimeout(() => {
        dispatch({ type: "guessedAnswer", value: true });
      }, 300);
      setAlreadyClicked(true);
    } else {
      if (alreadyClicked) return;
      setOptionStatus("error");
      dispatch({ type: "guessedAnswer", value: false });
      setAlreadyClicked(true);
    }
  };

  return (
    <Button type={optionStatus} onClick={handleClick}>
      {optName}
    </Button>
  );
});
Option.displayName = "Option";

const Question = ({ sprite, options, answer }) => {
  const { state } = useGameContext();
  const [pointsAnimation, setPointsAnimation] = useState(false);

  const handleAnimationEnd = () => {
    setPointsAnimation(false);
  };

  useEffect(() => {
    if (state.animatePoints !== 0) {
      setPointsAnimation(!pointsAnimation);
    }
  }, [state.animatePointsCount]);

  return (
    <div className="question">
      <div
        className={`question-points`}
        style={{ display: pointsAnimation ? "block" : "none" }}
        onAnimationEnd={handleAnimationEnd}
        aria-hidden="true"
      >
        <span>{`+${state.animatePoints}`}</span>
      </div>
      <div className="question-sprite">
        <img src={sprite} alt="pokemon" />
      </div>
      <div className="question-options">
        {options.map((opt, i) => (
          <div key={`${opt.name}-${i}`}>
            <Option optName={opt.name} answer={answer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
