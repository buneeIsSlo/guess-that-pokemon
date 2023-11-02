import "./css/question.css";
import { useState } from "react";
import useGameContext from "../hooks/useGameContext";
import { Button } from "@kylum/nes-react";

const Option = ({ optName, answer }) => {
    const { dispatch } = useGameContext();
    const [optionStatus, setOptionStatus] = useState(null);
    const [alreadyClicked, setAlreadyClicked] = useState(false);

    const handleClick = () => {
        if (answer === optName) {
            if (alreadyClicked) return;
            setOptionStatus("success");
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
        <Button
            type={optionStatus}
            onClick={handleClick}
        >
            {optName}
        </Button>
    );
};

const Question = ({ sprite, options, answer }) => {

    return (
      <div className="question">
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