import "@fontsource/press-start-2p";
import "nes.css/css/nes.min.css";
import Main from "./layout/Main";
import Header from "./layout/Header";
import InfoPopup from "./components/InfoPopup";

const App = () => {
  return (
    <div className="game">
      <Header />
      <Main />
      <InfoPopup />
    </div>
  );
};

export default App;
