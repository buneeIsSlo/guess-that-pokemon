import "@fontsource/press-start-2p";
import "nes.css/css/nes.min.css";
import Main from "./layout/Main";
import Header from "./layout/Header";

const App = () => {
  return (
    <div className="game">
      <Header />
      <Main />
    </div>
  );
};

export default App;