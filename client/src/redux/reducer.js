import {
  CLEAR_DETAIL,
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_POKEMON_DETAIL,
  CLEAR_HOME,
  UPDATE_HOME,
  DELETE_POKEMON,
  FILTER_TYPE,
  FILTER_ORIGEN,
  ORDEN_ALFABETICO,
  ORDEN_ATAQUE,
  GET_UPDATE_POKEMON,
  CLEAR_UPDATE,
  ALL_NAMES,
} from "./actions";

const initialState = {
  master: [],
  pokemons: [],
  pokemonsDb: [],
  detail: {},
  update: {},
  types: [],
  filtered: [],
  names: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        master: action.payload,
      };
    case ALL_NAMES:
      return {
        ...state,
        names: action.payload,
      };
    case GET_POKEMON_DETAIL:
      const id = action.payload;
      let pokemon;
      isNaN(id)
        ? (pokemon = state.pokemons.find((item) => item.id === id))
        : (pokemon = state.pokemons.find((item) => item.id === Number(id)));

      return {
        ...state,
        detail: pokemon,
      };
    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case CLEAR_HOME:
      return {
        ...state,
        filtered: [...state.master],
        pokemons: state.master,
      };
    case UPDATE_HOME:
      return {
        ...state,
        pokemons: action.payload,
        master: action.payload,
      };
    case DELETE_POKEMON:
      const filterDelete = state.pokemons.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        pokemons: filterDelete,
        master: filterDelete,
      };
    case FILTER_TYPE:
      state.filtered = [...state.master];
      state.filtered =
        action.payload === "all"
          ? state.master
          : [...state.master].filter((item) =>
              item.type.includes(action.payload)
            );
      return {
        ...state,
        pokemons: state.filtered,
      };
    case FILTER_ORIGEN:
      state.filtered = [...state.master];
      state.filtered =
        action.payload === "false"
          ? [...state.master].filter((item) => !item.inDataBase)
          : action.payload === "true"
          ? [...state.master].filter((item) => item.inDataBase)
          : state.master;
      return {
        ...state,
        pokemons: state.filtered,
      };
    case ORDEN_ALFABETICO:
      const copyAlf = state.filtered.length
        ? state.filtered
        : [...state.master];
      const filterAlf =
        action.payload === "az"
          ? copyAlf.sort((a, b) => a.name.localeCompare(b.name))
          : copyAlf.sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        pokemons: filterAlf,
      };
    case ORDEN_ATAQUE:
      const copyAtaq = state.filtered.length
        ? state.filtered
        : [...state.master];
      const filterAtaq =
        action.payload === "menor"
          ? copyAtaq.sort((a, b) => a.attack - b.attack)
          : copyAtaq.sort((a, b) => b.attack - a.attack);
      return {
        ...state,
        pokemons: filterAtaq,
      };
    case CLEAR_UPDATE:
      return {
        ...state,
        update: {},
      };
    case GET_UPDATE_POKEMON:
      const copyUpdate = [...state.master];
      const pok = copyUpdate.find((item) => item.id === action.payload);
      return {
        ...state,
        update: pok,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
