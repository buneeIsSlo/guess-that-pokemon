import "@fontsource/press-start-2p";
import "nes.css/css/nes.min.css";
import { useEffect, useState } from "react";
import { Button } from "@kylum/nes-react";
import { useImmerReducer } from "use-immer";

// const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";
const MAX_LIVES = 5;

const initalState = {
  uniqueNums: new Set(),
  pokemonData: [],
  firstThousand: [],
  currentQuestion: null,
  isPlaying: false,
  lives: MAX_LIVES,
};

function reducer(draft, action) {
  switch (action.type) {
    case "currentQuestion":
      draft.lives = MAX_LIVES;
      draft.isPlaying = true;
      // draft.currentQuestion = generateQuestion();
      return;
    case "guessed":
      if (draft.currentQuestion.answer === action.value) {
        draft.currentQuestion = generateQuestion();
      } else {
        draft.lives -= 1;
        if (draft.lives < 1) draft.isPlaying = false;
        console.log(draft.lives);
      }
      return;
    case "getPokemonData":
      draft.pokemonData = action.value;
      pickRandom60(draft.pokemonData);
      return;
    case "addPokemon":
      draft.pokemonData = [...draft.pokemonData, action.value];
  }

  function pickRandom60(array) {
    const random60 = new Set();
    const maxPokemons = 4;

    while (random60.size < maxPokemons) {
      const randomNum = Math.floor(Math.random() * array.length);
      random60.add(array[randomNum]);
    }

    console.log(...random60);
  }

  function generateQuestion() {
    const fourRandomPokemons = retrieveRandomFour();
    // console.log(fourRandomPokemons);

    const randomNum = Math.floor(Math.random() * 4);
    const pokemonToGuess = fourRandomPokemons[randomNum];

    return {
      pokemonToGuess: pokemonToGuess[1],
      options: fourRandomPokemons.map((pokemonArr) => pokemonArr[0]),
      answer: pokemonToGuess[0],
    };
  }

  function retrieveRandomFour() {
    const randomFour = new Set();
    const numOfOptions = 4;

    while (randomFour.size < numOfOptions) {
      const randomNum = Math.floor(Math.random() * draft.firstThousand.length);
      randomFour.add(draft.firstThousand[randomNum]);
      // draft.firstThousand.splice(randomNum, 1);
    }

    return [...randomFour].map((str) => {
      const [pokemonName, pokemonSprite] = str.split("@");
      return [pokemonName, pokemonSprite];
    });
  }
}

function App() {
  const [gameState, dispatch] = useImmerReducer(reducer, initalState);

  useEffect(() => {
    const randomUniqueNums = init();
    const pokemonData = [];
    let it = 0;

    randomUniqueNums.forEach(async (num) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
      const data = await response.json();
      const { name, sprites } = data;

      dispatch({ type: "addPokemon", value: [name, sprites.front_default] });
      it += 1;
    });

    console.log(it);
  }, []);

  function init() {
    const { uniqueNums } = gameState;
    const myNums = [];
    let NUMS_ADDED = 60;

    while (NUMS_ADDED > 0) {
      const randomNum = Math.floor(Math.random() * 1000 + 1);

      if (uniqueNums.has(randomNum)) continue;
      uniqueNums.add(randomNum);
      myNums.push(randomNum);
      NUMS_ADDED--;
    }

    return myNums;
  }

  return (
    <>
      <h1>
        Guess <br></br>that<br></br> Pokemon
      </h1>
      {!gameState.isPlaying && (
        <Button
          onClick={() => {
            // dispatch({ type: "currentQuestion" });
            // pickRandom60();
            console.log(gameState.pokemonData);
          }}
        >
          PLAY GAME
        </Button>
      )}
      {gameState.isPlaying && gameState.currentQuestion && (
        <div className="question">
          <div className="pokemon__wrapper">
            <img
              src={gameState.currentQuestion.pokemonToGuess}
              alt=""
              className="pokemon__sprite"
            />
          </div>
          <div className="options">
            {gameState.currentQuestion.options.map((opt, i) => {
              return (
                <Button
                  onClick={() => dispatch({ type: "guessed", value: opt })}
                  key={i}
                >
                  {opt}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
