import "@fontsource/press-start-2p";
import "nes.css/css/nes.min.css";
import useGameContext from "./hooks/useGameContext";
import { Button } from "@kylum/nes-react";
import Main from "./layout/Main";
import Header from "./layout/Header";

const Loading = () => {
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}

const App = () => {
  const { state, dispatch } = useGameContext();

  const onClickPlay = () => {
    dispatch({ type: "startGame" });
  };

  return (
    <div className="game">
      {!state.doneFetching && (<Loading />)}
      {state.doneFetching && (
        <Button onClick={onClickPlay}>PLAY GAME</Button>
      )}
      {state.isPlaying && (<Header />)}
      <Main />
    </div>
  );
};

export default App;