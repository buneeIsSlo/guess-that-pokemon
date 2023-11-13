import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import {
  INITIAL_STATE,
  MAX_LIVES,
  ROUND_SCORE,
  TOTAL_TIME,
} from "../utils/constants";

const reducer = (draft, action) => {
  switch (action.type) {
    case "doneFetching":
      draft.doneFetching = true;
    case "addPokemon":
      if (action.value === undefined) return;
      draft.pokemonData = [...draft.pokemonData, action.value];
      break;
    case "startGame":
      draft.isPlaying = true;
      draft.currentQuestion = generateQuestion();
      break;
    case "reStartGame":
      draft.isPlaying = true;
      draft.currentQuestion = generateQuestion();
      draft.isRePlaying = false;
      break;
    case "addFetched":
      draft.fetchedNums.add(action.value);
      break;
    case "guessedAnswer":
      if (action.value) {
        draft.mainScore += draft.roundScore;
        // console.log({round: draft.roundScore, main: draft.mainScore});
        draft.roundScore = ROUND_SCORE;
        draft.currentQuestion = generateQuestion();
      } else {
        draft.lives -= 1;
        if (draft.lives <= 0) {
          draft.isPlaying = false;
          return;
        }
        draft.roundScore -= 10;
      }
      break;
    case "setHighScore":
      draft.highScore = action.value ? action.value : draft.mainScore;
      break;
    case "decreaseTime":
      if (draft.timeRemaining <= 0) {
        draft.isPlaying = false;
      } else {
        draft.timeRemaining--;
      }
      break;
    case "resetState":
      draft.isPlaying = false;
      draft.doneFetching = false;
      draft.fetchCount += 1;
      draft.roundScore = ROUND_SCORE;
      draft.mainScore = 0;
      draft.lives = MAX_LIVES;
      draft.timeRemaining = TOTAL_TIME;
      draft.currentQuestion = null;
      draft.pokemonData = [];
      draft.fetchedNums = new Set();
      draft.isRePlaying = true;
      break;
    case "musicStatus":
      draft.isMusicPlaying = action.value;
    case "logState":
      console.log(draft.fetchedNums);
      break;
  }

  function generateQuestion() {
    if (draft.pokemonData.length <= 68) {
      draft.fetchCount += 1;
    }

    if (draft.currentQuestion) {
      draft.pokemonData = draft.pokemonData.slice(4, draft.pokemonData.length);
    }

    const tempRandom = Math.floor(Math.random() * 4);
    const fourOptions = draft.pokemonData.slice(0, 4);
    console.log(fourOptions);
    return {
      sprite: fourOptions[tempRandom].sprite,
      answer: fourOptions[tempRandom].name,
      options: fourOptions,
    };
  }
};

const GameContext = createContext(null);
const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, INITIAL_STATE);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameContextProvider };
