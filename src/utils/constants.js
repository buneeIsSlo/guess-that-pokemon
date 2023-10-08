const MAX_LIVES = 5;
const POKEMONS_RANGE = 500;
const MAX_POKEMONS = 40;
const INITIAL_STATE = {
  doneFetching: false,
  fetchedNums: new Set(),
  fetchCount: 0,
  pokemonData: [],
  currentQuestion: null,
  isPlaying: false,
  lives: MAX_LIVES,
};

export {
    MAX_LIVES,
    POKEMONS_RANGE,
    MAX_POKEMONS,
    INITIAL_STATE
};