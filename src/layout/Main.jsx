import "@fontsource/press-start-2p";
import "nes.css/css/nes.min.css";
import { useState, useEffect } from "react";
import useGameContext from "../hooks/useGameContext";
import { Button } from "@kylum/nes-react";
import { enableMapSet } from "immer";
import { POKEMONS_RANGE, MAX_POKEMONS } from "../utils/constants";

enableMapSet();

const Option = ({ optName, answer }) => {
  const [optionStatus, setOptionStatus] = useState("normal");
  
  const handleClick = () => {
    if (answer === optName) {
      setOptionStatus("success");
    } else {
      setOptionStatus("error");
    }
  };
  
  useEffect(() => {
    setOptionStatus("normal");
  }, [answer]);
  
  return (
    <Button 
      type={optionStatus}
      onClick={handleClick}
    >
      {optName}
    </Button>
  );
};

const Main = () => {
  const { state, dispatch } = useGameContext();
  
  const getRandomNums = () => {
    const { fetchedNums } = state;
    const nums = [];
    
    while (nums.length < MAX_POKEMONS) {
      const num = Math.floor(Math.random() * POKEMONS_RANGE) + 1;
      if (!fetchedNums.has(num)) {
        nums.push(num);
        dispatch({ type: "addFetched", value: num });
      }
    }
    
    return nums;
  };
  
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const randomUniqueNums = getRandomNums();
        for (const num of randomUniqueNums) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
          const data = await response.json();
          const { name, sprites } = data;
          dispatch({ type: "addPokemon", value: { name, sprite: sprites.front_default } });
        }
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      } finally {
        console.log("Finished making requests");
        if (!state.isPlaying) {
          dispatch({ type: "doneFetching" });
        }
      }
    };
    
    fetchPokemons();
  }, [state.fetchCount]);
  
  return (
    <div>
      {state.currentQuestion && (
        <>
          <img src={state.currentQuestion.sprite} alt="" />
          {state.currentQuestion.options.map((opt, i) => (
            <div key={i}>
              <br />
              <Option optName={opt.name} answer={state.currentQuestion.answer} />
            </div>
          ))}
          <br />
          <p>Answer: {state.currentQuestion.answer}</p>
        </>
      )}
    </div>
  );
};

export default Main;