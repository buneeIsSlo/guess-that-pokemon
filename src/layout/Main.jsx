import "./css/main.css";
import { useEffect, useCallback, useMemo } from "react";
import useGameContext from "../hooks/useGameContext";
import { enableMapSet } from "immer";
import { POKEMONS_RANGE, MAX_POKEMONS } from "../utils/constants";
import Question from "../components/Question";
import Loader from "../components/Loader";
import StartModal from "../components/StartModal";
import EndModal from "../components/EndModal";

enableMapSet();

const getRandomNums = (fetchedNums, dispatch) => {
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

const fetchPokemons = async (state, dispatch) => {
  try {
    const randomUniqueNums = getRandomNums(state.fetchedNums, dispatch);
    for (const num of randomUniqueNums) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
      const data = await response.json();
      const { name, sprites } = data;
      dispatch({
        type: "addPokemon",
        value: { name, sprite: sprites.front_default },
      });
    }
  } catch (error) {
    console.error("Error fetching pokemons:", error);
  } finally {
    if (!state.isPlaying) {
      dispatch({ type: "doneFetching" });
    }
    if (state.isRePlaying) {
      dispatch({ type: "reStartGame" });
    }
  }
};

const Main = () => {
  const { state, dispatch } = useGameContext();
  const fetchPokemonsMemoized = useCallback(
    () => fetchPokemons(state, dispatch),
    [state, dispatch]
  );

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
    fetchPokemonsMemoized();
  }, [state.fetchCount]);

  const questionComponent = useMemo(() => {
    if (state.currentQuestion && state.isPlaying) {
      return (
        <Question
          sprite={state.currentQuestion.sprite}
          options={state.currentQuestion.options}
          answer={state.currentQuestion.answer}
        />
      );
    }
    return null;
  }, [state.currentQuestion, state.isPlaying]);

  return (
    <main id="main">
      {!state.doneFetching && <Loader />}
      {state.doneFetching && !state.currentQuestion && !state.isRePlaying && (
        <StartModal />
      )}
      {questionComponent}
      {(state.timeRemaining <= 0 || state.lives <= 0) && !state.isPlaying && (
        <EndModal />
      )}
    </main>
  );
};

export default Main;
