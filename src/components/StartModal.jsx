import "./css/start.css";
import useGameContext from "../hooks/useGameContext";
import { Container, List, Badge, Button } from "@kylum/nes-react";

const StartModal = () => {
  const { dispatch } = useGameContext();

  const onClickPlay = () => {
    dispatch({ type: "startGame" });
  };

  return (
    <div className="start-modal">
      <Container isRounded>
        <Badge label="rules" type="primary" />
        <List
          items={[
            "Guess that pokemon",
            "Guess under 60 seconds",
            "You have 5 lives",
          ]}
        />
        <Button onClick={onClickPlay}>PLAY GAME</Button>
      </Container>
    </div>
  );
};

export default StartModal;
