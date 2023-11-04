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
        <h2>Welcome Trainer</h2>
        <Badge label="Objective" type="primary" />
        <List
          items={[
            "Your goal is to correctly identify as many Pokémon as possible.",
          ]}
        />
        <Badge label="Rules" type="primary" />
        <List
          items={[
            "Check out the Pokémon pic.",
            "Pick the right Pokémon from the 4 options.",
            "You've got just 60 seconds, so hustle!",
            "Be spot on with your choice to get a high score!",
          ]}
        />
        <Badge label="Lives" type="primary" />
        <List
          items={[
            "You start with 5 lives, but each wrong answer costs one. Choose wisely!",
          ]}
        />
        <div className="start-modal-play">
          <Button onClick={onClickPlay} type="primary">
            PLAY GAME
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default StartModal;
