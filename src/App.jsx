import "@fontsource/press-start-2p";
import "nes.css/css/nes.min.css";
import { useEffect } from "react";
import useGameContext from "./hooks/useGameContext";
import { Button } from "@kylum/nes-react";
import { enableMapSet } from "immer";
import { POKEMONS_RANGE, MAX_POKEMONS } from "./utils/constants";

enableMapSet();

const App = () => {
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
    async function fetchPokemons() {
      const randomUniqueNums = getRandomNums();
      for (const num of randomUniqueNums) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
        const data = await response.json();
        const { name, sprites } = data;
        dispatch({ type: "addPokemon", value: { name, sprite: sprites.front_default } });
      }
    };

    fetchPokemons();
  }, [state.fetchCount]);

  const onClickPlay = () => {
    dispatch({ type: "startGame" });
  };

  return (
    <div id="game">
      <h1>GTP</h1>
      {true && (
        <Button onClick={onClickPlay}>PLAY GAME</Button>
      )}
      {state.isPlaying && (
        <h2>Guess the right answer</h2>
      )}
      {state.currentQuestion && (
        <>
          <img src={state.currentQuestion.sprite} alt="" />
          {state.currentQuestion.options.map((opt, i) => (
            <div key={i}>
              <br />
              <Button>{opt.name}</Button>
            </div>
          ))}
          <br />
          <p>Answer: {state.currentQuestion.answer}</p>
        </>
      )}
    </div>
  );
};

export default App;