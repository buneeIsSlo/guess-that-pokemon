import "@fontsource/press-start-2p";
import "nes.css/css/nes.min.css";
import { useEffect } from "react";
import { Button } from "@kylum/nes-react";
import { enableMapSet } from "immer";
import { useImmerReducer } from "use-immer";

enableMapSet();
const MAX_LIVES = 5;
const initalState = {
  fetchedNums: new Set(),
  fetchCount: 0,
  pokemonData: [],
  currentQuestion: null,
  isPlaying: false,
  lives: MAX_LIVES,
};

const reducer = (draft, action) => {
  switch (action.type) {
    case "addPokemon":
      draft.pokemonData = [...draft.pokemonData, action.value];
      break;
    case "startGame":
      draft.isPlaying = true;
      draft.currentQuestion = generateQuestion();
      break;
    case "logState":
      console.log(draft);
      break;
  }

  function generateQuestion() {
    console.log(draft.pokemonData.length);

    if(draft.pokemonData.length <= 68) {
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
}

const App = () => {
  const [state, dispatch] = useImmerReducer(reducer, initalState);

  useEffect(() => {
    const randomUniqueNums = randomNums();

    async function go() {
      for (const num of randomUniqueNums) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
        const data = await response.json();
        const { name, sprites } = data;
        dispatch({ type: "addPokemon", value: { name, sprite: sprites.front_default } });
      }
    }

    go();
  }, [state.fetchCount]);

function randomNums() {
  const maxRange = 500;
  const maxRandomNums = 40;
  const { fetchedNums } = state;
  const nums = [];

  while (nums.length < maxRandomNums) {
    const num = Math.floor(Math.random() * maxRange) + 1;

    if (fetchedNums.has(num)) continue;
    fetchedNums.add(num);
    nums.push(num);
  }

  return nums;
}

  const onClickPlay = () => {
    dispatch({ type: "startGame" });
  }

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
          {state.currentQuestion.options.map((opt) => (
            <>
              <br />
              <Button>{opt.name}</Button>
            </>
          ))}
          <br />
          <p>Answer: {state.currentQuestion.answer}</p>
        </>
      )}
    </div>
  )
}

export default App;