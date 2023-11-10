import "./css/main.css";
import { useEffect } from "react";
import useGameContext from "../hooks/useGameContext";
import { enableMapSet } from "immer";
import { POKEMONS_RANGE, MAX_POKEMONS } from "../utils/constants";
import Question from "../components/Question";
import Loader from "../components/Loader";
import StartModal from "../components/StartModal";
import EndModal from "../components/EndModal";

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
    const highscore = localStorage.getItem("highscore");
    dispatch({ type: "setHighScore", value: highscore });
  }, []);

  useEffect(() => {
    if (state.mainScore > state.highScore) {
      localStorage.setItem("highscore", state.mainScore);
      dispatch({ type: "setHighScore", value: state.mainScore });
    }
  }, [state.mainScore]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const randomUniqueNums = getRandomNums();
        for (const num of randomUniqueNums) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${num}`
          );
          if (!response.ok) console.log("reason!!");
          const data = await response.json();
          const { name, sprites } = data;
          dispatch({
            type: "addPokemon",
            value: { name, sprite: sprites.front_default },
          });
        }
      } catch (error) {
        a;
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
      {!state.doneFetching && <Loader />}
      {state.doneFetching && !state.currentQuestion && <StartModal />}
      {state.currentQuestion && state.isPlaying && (
        <Question
          sprite={state.currentQuestion.sprite}
          options={state.currentQuestion.options}
          answer={state.currentQuestion.answer}
        />
      )}
      {(state.timeRemaining <= 0 || state.lives <= 0) && !state.isPlaying && (
        <EndModal />
      )}
    </main>
  );
};

export default Main;
