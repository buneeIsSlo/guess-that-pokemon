import { useEffect } from "react";
import useGameContext from "../hooks/useGameContext";
import { enableMapSet } from "immer";
import { POKEMONS_RANGE, MAX_POKEMONS } from "../utils/constants";
import Question from "../components/Question";

enableMapSet();

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
          if(!response.ok) console.log("reason!!");
          const data = await response.json();
          const { name, sprites } = data;
          dispatch({ type: "addPokemon", value: { name, sprite: sprites.front_default } });
          // console.log({ name, sprite: sprites.front_default });
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
    <main id="main">
      {state.currentQuestion && (
        <Question
          sprite={state.currentQuestion.sprite}
          options={state.currentQuestion.options}
          answer={state.currentQuestion.answer}
        />
      )}
    </main>
  );
};

export default Main;