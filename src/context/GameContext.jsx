import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { MAX_LIVES, INITIAL_STATE } from "../utils/constants";

const reducer = (draft, action) => {
  switch (action.type) {
    case "addPokemon":
      draft.pokemonData = [...draft.pokemonData, action.value];
      break;
    case "startGame":
      draft.isPlaying = true;
      draft.currentQuestion = generateQuestion();
      break;
    case "addFetched":
      draft.fetchedNums.add(action.value);
      break;
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
    return {
      sprite: fourOptions[tempRandom].sprite,
      answer: fourOptions[tempRandom].name,
      options: fourOptions
    }
  }
};

const GameContext = createContext(null);
const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, INITIAL_STATE);

  return (
    <GameContext.Provider value={{state, dispatch}} >
      {children}
    </GameContext.Provider>
  )
};

export {GameContext, GameContextProvider};

