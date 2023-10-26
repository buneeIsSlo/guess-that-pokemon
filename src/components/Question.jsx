import { useState } from "react";
import useGameContext from "../hooks/useGameContext";
import { Button } from "@kylum/nes-react";

const Option = ({ optName, answer }) => {
    const { dispatch } = useGameContext();
    const [optionStatus, setOptionStatus] = useState(null);

    const handleClick = () => {
        if (answer === optName) {
            setOptionStatus("success");
            setTimeout(() => {
                dispatch({ type: "guessedAnswer", value: true });
            }, 300);
        } else {
            setOptionStatus("error");
            dispatch({ type: "guessedAnswer", value: false });
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
        <>
            <img src={sprite} alt="pokemon" />
            {options.map((opt, i) => (
                <div key={`${opt.name}-${i}`}>
                    <br />
                    <Option optName={opt.name} answer={answer} />
                </div>
            ))}
            <br />
            <p>Answer: {answer}</p>
        </>
    );
};

export default Question;