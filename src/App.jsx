import "@fontsource/press-start-2p";
import "nes.css/css/nes.min.css";
import { useEffect, useState } from "react";
import { Button } from "@kylum/nes-react";
import { useImmerReducer } from "use-immer";

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=1000";
const initalState = {
  firstThousand: [],
  currentQuestion: null,
};

function reducer(draft, action) {
  switch (action.type) {
    case "storeFirstThousand":
      draft.firstThousand.push(action.value);
      return;
    case "currentQuestion":
      draft.currentQuestion = generateQuestion();
      console.log(draft.currentQuestion);
      return;
    case "guessed":
      if (draft.currentQuestion.answer === action.value) {
        console.log("niceooo");
        draft.currentQuestion = generateQuestion();
      }
  }

  function generateQuestion() {
    const fourRandomPokemons = retrieveRandomFour();
    console.log(fourRandomPokemons);

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
      draft.firstThousand.splice(randomNum, 1);
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
    const reqController = new AbortController();

    async function fetchFirstThousand() {
      try {
        const API = await fetch(POKE_API_URL, { signal: reqController.signal });
        const response = await API.json();
        const pokemonURLs = await response.results;

        pokemonURLs.map(async (res) => {
          const data = await fetch(`${res.url}`);
          let { name, sprites } = await data.json();

          dispatch({
            type: "storeFirstThousand",
            value: name + "@" + sprites.front_default,
          });
        });
      } catch {
        console.log("Error");
      }
    }

    fetchFirstThousand();
    return () => {
      reqController.abort();
    };
  }, []);

  return (
    <>
      <h1>
        Guess <br></br>that<br></br> Pokemon
      </h1>
      <Button
        onClick={() => {
          dispatch({ type: "currentQuestion" });
          console.log(gameState.firstThousand.length);
        }}
      >
        Generate question
      </Button>
      {gameState.currentQuestion && (
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
