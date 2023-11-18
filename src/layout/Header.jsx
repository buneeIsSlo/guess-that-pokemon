import "./css/header.css";
import { memo } from "react";
import { useEffect, useRef } from "react";
import useSound from "use-sound";
import useGameContext from "../hooks/useGameContext";
import { Icon, Button } from "@kylum/nes-react";
import bgMusic from "../assets/sounds/happy-8bit.mp3";
import soundOnIcon from "../assets/images/sound-on.svg";
import soundOffIcon from "../assets/images/sound-off.svg";

const ClockIcon = memo(() => {
  const { state } = useGameContext();

  return (
    <svg
      className={state.isPlaying ? "animate-spin" : ""}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 9V7H21V5H20V4H19V3H17V2H15V1H9V2H7V3H5V4H4V5H3V7H2V9H1V15H2V17H3V19H4V20H5V21H7V22H9V23H15V22H17V21H19V20H20V19H21V17H22V15H23V9H22ZM21 15H20V17H19V19H17V20H15V21H9V20H7V19H5V17H4V15H3V9H4V7H5V5H7V4H9V3H15V4H17V5H19V7H20V9H21V15Z"
        fill="black"
      />
      <path
        d="M16 15V16H15V17H14V16H13V15H12V14H11V5H13V13H14V14H15V15H16Z"
        fill="black"
      />
    </svg>
  );
});

const Lives = () => {
  const { state } = useGameContext();
  let livesLeft = state.lives;
  let livesLost = 5 - livesLeft;

  return (
    <span className="lives">
      {[...Array(livesLost)].map((item, index) => {
        return <Icon key={index} type="heart" className="is-empty" />;
      })}
      {[...Array(livesLeft)].map((item, index) => {
        return <Icon key={index} type="heart" />;
      })}
    </span>
  );
};

const Timer = memo(({ timeRemaining }) => {
  return (
    <span>{timeRemaining < 10 ? "0" + timeRemaining : timeRemaining}</span>
  );
});

const Header = memo(() => {
  const { state, dispatch } = useGameContext();
  const timer = useRef(null);
  const [play, { sound }] = useSound(bgMusic, { interrupt: true });

  const handleMusic = () => {
    if (state.isMusicPlaying) {
      sound.stop();
    } else {
      sound._loop = true;
      const musicId = sound.play();
      sound.fade(0, 1, 5000, musicId);
    }
  };

  const handleClick = () => {
    handleMusic();
    dispatch({ type: "musicStatus", value: !state.isMusicPlaying });
  };

  useEffect(() => {
    if (state.isPlaying) {
      timer.current = setInterval(() => {
        dispatch({ type: "decreaseTime" });
      }, 1000);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [state.isPlaying]);

  return (
    <header id="header">
      <h1>
        <a href="/">
          Guess
          <br />
          that
          <br />
          Pokemon
        </a>
      </h1>
      <div className="header-stats">
        <Lives />
        <span className="timer">
          <ClockIcon />
          <Timer timeRemaining={state.timeRemaining} />
        </span>
      </div>
      <div className="header-music">
        <Button onClick={handleClick}>
          <img src={state.isMusicPlaying ? soundOnIcon : soundOffIcon} alt="" />
        </Button>
      </div>
    </header>
  );
});

export default Header;
