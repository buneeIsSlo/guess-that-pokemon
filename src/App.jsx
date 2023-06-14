import "@fontsource/press-start-2p";
import "nes.css/css/nes.min.css";
import { useEffect, useState } from "react";
import { Button } from "@kylum/nes-react";
import { useImmerReducer } from "use-immer";

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";
const MAX_LIVES = 5;

const initalState = {
  pokemonData: [],
  firstThousand: [],
  currentQuestion: null,
  isPlaying: false,
  lives: MAX_LIVES,
};

function reducer(draft, action) {
  switch (action.type) {
    case "storeFirstThousand":
      draft.firstThousand.push(action.value);
      return;
    case "currentQuestion":
      draft.lives = MAX_LIVES;
      draft.isPlaying = true;
      draft.currentQuestion = generateQuestion();
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
      draft.pokemonData.push(action.value);
      return;
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

  // useEffect(() => {
  //   const reqController = new AbortController();

  //   async function fetchFirstThousand() {
  //     try {
  //       const API = await fetch(POKE_API_URL, { signal: reqController.signal });
  //       const response = await API.json();
  //       const pokemonURLs = await response.results;

  //       pokemonURLs.map(async (res) => {
  //         const data = await fetch(`${res.url}`);
  //         let { name, sprites } = await data.json();

  //         dispatch({
  //           type: "storeFirstThousand",
  //           value: name + "@" + sprites.front_default,
  //         });
  //       });
  //     } catch {
  //       console.log("Error");
  //     }
  //   }

  //   fetchFirstThousand();
  //   return () => {
  //     reqController.abort();
  //   };
  // }, []);

  function newFetch() {
    const pokeURLs = JSON.parse(localStorage.getItem("pokeURLs"));

    if (pokeURLs) {
      dispatch({ type: "getPokemonData", value: pokeURLs });
      console.log(pokeURLs);
      pickRandom60();
      return;
    }

    useEffect(() => {
      const reqController = new AbortController();

      async function getPokemons() {
        try {
          const API = await fetch(POKE_API_URL, {
            signal: reqController.signal,
          });
          const response = await API.json();
          console.log(response);
          const pokeU = await response.results;

          localStorage.setItem("pokeURLs", JSON.stringify(pokeU));
          dispatch({ type: "getPokemonData", value: pokeU });
          pickRandom60();
        } catch {
          console.log("Error");
        }
      }

      getPokemons();
      return () => {
        reqController.abort();
      };
    }, []);
  }

  function pickRandom60() {
    const random60 = new Set();
    const maxPokemons = 5;

    while (random60.size <= maxPokemons) {
      const randomNum = Math.floor(
        Math.random() * gameState.pokemonData.length
      );
      console.log(gameState.pokemonData);
      random60.add(gameState.pokemonData[randomNum]["name"]);
      gameState.pokemonData.splice(randomNum, 1);
    }

    // [...random60].map(async (res) => {
    //   const data = await fetch(`${res.url}`);
    //   let { name, sprites } = await data.json();

    //   dispatch({
    //     type: "storeFirstThousand",
    //     value: name + "@" + sprites.front_default,
    //   });
    // });

    // console.log(random60);
  }

  newFetch();

  return (
    <>
      <h1>
        Guess <br></br>that<br></br> Pokemon
      </h1>
      {!gameState.isPlaying && (
        <Button
          onClick={() => {
            dispatch({ type: "currentQuestion" });
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

/*
  const endpoint = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
const numPokemons = 50;
const pokemons = [];

// Fetch list of all pokemons
fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    // Randomly select 50 pokemons
    const randomIndices = new Set();
    while (randomIndices.size < numPokemons) {
      randomIndices.add(Math.floor(Math.random() * data.results.length));
    }
    const randomPokemons = Array.from(randomIndices).map(i => data.results[i]);

    // Fetch name and sprite for each pokemon
    return Promise.all(randomPokemons.map(pokemon => {
      return fetch(pokemon.url)
        .then(response => response.json())
        .then(data => {
          pokemons.push({
            name: data.name,
            sprite: data.sprites.front_default
          });
        });
    }));
  })
  .then(() => {
    // Do something with the pokemons array
    console.log(pokemons);
  })
  .catch(error => {
    console.error(error);
  });
  
 */
