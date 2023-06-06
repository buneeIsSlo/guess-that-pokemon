import "@fontsource/press-start-2p";
import "nes.css/css/nes.min.css";
import { Button } from "@kylum/nes-react";
import { useEffect, useState } from "react";

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=10";

function App() {
  const [test, setTest] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reqController = new AbortController();

    async function fetchFirstThousand() {
      try {
        const API = await fetch(POKE_API_URL, { signal: reqController.signal });
        const response = await API.json();
        const pokemonURLs = await response.results;

        const tmpArr = [];
        pokemonURLs.map(async (res) => {
          const data = await fetch(`${res.url}`);
          var { name, sprites } = await data.json();

          tmpArr.push(sprites.front_default);
          setTest(tmpArr);
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

  function showPokemons() {}

  return (
    <>
      <h1>
        Guess <br></br>that<br></br> Pokemon
      </h1>
      <Button onClick={() => setShow(true)}>Fetch first 10</Button>
      {show &&
        test.map((sprite, i) => {
          return (
            <img src={sprite} alt="" key={i} style={{ display: "block" }} />
          );
        })}
    </>
  );
}

export default App;
