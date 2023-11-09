import "./css/info.css";
import { Dialog, Button, Icon } from "@kylum/nes-react";

const InfoPopup = () => {
  return (
    <div className="info-popup">
      <Dialog id="info" buttonLabel="!" buttonType="primary" isRounded>
        <div className="content">
          <h2>Oh, Hi there!</h2>
          <p className="credit-text">
            This project wouldn't be possible without{" "}
            <a href="https://nostalgic-css.github.io/NES.css/" target="_blank">
              NES.css
            </a>
            .
          </p>
          <p className="credit-text">
            Components by:{" "}
            <a href="https://github.com/HiKaylum/nes-react" target="_blank">
              HiKaylum
            </a>
          </p>
          <p className="credit-text">
            Game coded by:{" "}
            <a href="https://github.com/buneeIsSlo" target="_blank">
              bunee
            </a>
          </p>
          <Button
            as="link"
            href="https://github.com/buneeIsSlo/guess-that-pokemon"
            id="star-please"
            type="primary"
            target="_blank"
          >
            <Icon type="star" />
            Leave a star maybe?
            <Icon type="star" />
          </Button>
          <Button type="error">Okay, close</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default InfoPopup;
