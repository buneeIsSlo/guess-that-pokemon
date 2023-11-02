const MAX_LIVES = 5;
const POKEMONS_RANGE = 500;
const MAX_POKEMONS = 40;
const ROUND_SCORE = 40;
const TOTAL_TIME = 60;
const INITIAL_STATE = {
  doneFetching: false,
  fetchedNums: new Set(),
  fetchCount: 0,
  pokemonData: [],
  currentQuestion: null,
  isPlaying: false,
  lives: MAX_LIVES,
  roundScore: ROUND_SCORE,
  mainScore: 0,
  timeRemaining: TOTAL_TIME,
};

export {
    MAX_LIVES,
    POKEMONS_RANGE,
    MAX_POKEMONS,
    ROUND_SCORE,
    INITIAL_STATE
};