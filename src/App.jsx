import "@fontsource/press-start-2p";
import "nes.css/css/nes.min.css";
import { Dialog, Button } from "@kylum/nes-react";
import Main from "./layout/Main";
import Header from "./layout/Header";

const App = () => {
  return (
    <div className="game">
      <Header />
      <Main />
      <div className="info">
        <Dialog id="info" buttonLabel="!" buttonType="primary" isRounded>
          <div className="content">
            <h2>Oh, Hi there!</h2>
            <p>
              This project wouldn't be possible without{" "}
              <a href="https://nostalgic-css.github.io/NES.css/">NES.css</a>.
            </p>
            <p>
              Components by:{" "}
              <a href="https://github.com/HiKaylum/nes-react">HiKaylum</a>
            </p>
            <p>
              Game coded by: <a href="#">bunee</a>
            </p>
            <Button as="link" href="#">
              Start the repo maybe?
            </Button>
            <Button>Oh, cool</Button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default App;
