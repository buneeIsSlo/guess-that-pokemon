import "./css/end.css";
import useGameContext from "../hooks/useGameContext";
import { Container, Badge, Icon, Button } from "@kylum/nes-react";
import { useEffect } from "react";

const EndModal = () => {
  const { state, dispatch } = useGameContext();

  const onClickPlay = () => {
    dispatch({ type: "startGame" });
  };

  return (
    <div className="end-modal">
      <Container isRounded>
        {state.timeRemaining <= 0 && <h2>Time's Up!</h2>}
        {state.lives <= 0 && <h2>Zero Lives!</h2>}
        <Badge type="warning" label="Score" />
        <div className="end-modal-score">
          <p>{state.mainScore}</p>
          <Icon type="star" />
        </div>
        <Badge type="warning" label="High Score" />
        <div className="end-modal-score">
          <p>{state.highScore === 0 ? state.mainScore : state.highScore}</p>
          <Icon type="star" />
        </div>
        <div className="end-modal-play">
          <Button onClick={onClickPlay} type="primary">
            PLAY AGAIN
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default EndModal;
