import "./css/loader.css";
import loaderGif from "../assets/images/loading.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loaderGif} alt="loading pokemons" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
