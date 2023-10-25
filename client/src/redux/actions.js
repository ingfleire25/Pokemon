import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const CLEAR_HOME = "CLEAR_HOME";
export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_ORIGEN = "FILTER_ORIGEN";
export const ORDEN_ALFABETICO = "ORDEN_ALFABETICO";
export const ORDEN_ATAQUE = "ORDEN_ATAQUE";
export const GET_UPDATE_POKEMON = "GET_UPDATE_POKEMON";
export const CLEAR_UPDATE = "CLEAR_UPDATE";
export const UPDATE_HOME = "UPDATE_HOME";
export const ALL_NAMES = "ALL_NAMES";

export const getAllPokemons = () => {
  return async function (dispatch) {
    const apidata = await axios.get("/pokemons");
    const pokemons = apidata.data;
    dispatch({ type: GET_ALL_POKEMONS, payload: pokemons });
  };
};

export const allNames = () => {
  return async function (dispatch) {
    const apidata = await axios.get("/pokemons/names");
    const names = apidata.data;
    dispatch({ type: ALL_NAMES, payload: names });
  };
};

export const getPokemonDetail = (id) => {
  return {
    type: GET_POKEMON_DETAIL,
    payload: id,
  };
};

export const getAllTypes = () => {
  return async function (dispatch) {
    const apidata = await axios.get("/types");
    const types = apidata.data;
    dispatch({ type: GET_ALL_TYPES, payload: types });
  };
};

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
    payload: {},
  };
};

export const createPokemon = (data) => {
  return async function (dispatch) {
    const create = await axios.post("/pokemons", data);
    return create;
  };
};

export const updatePokemon = (data) => {
  return async function (dispatch) {
    const update = await axios.put("/pokemons", data);
    return update;
  };
};

export const deletePokemon = (id) => {
  return async function (dispatch) {
    await axios.delete(`/pokemons/${id}/delete`);
    dispatch({ type: DELETE_POKEMON, payload: id });
  };
};

export const clearHome = () => {
  return {
    type: CLEAR_HOME,
  };
};

export const filterType = (value) => {
  return {
    type: FILTER_TYPE,
    payload: value,
  };
};

export const filterOrigen = (value) => {
  return {
    type: FILTER_ORIGEN,
    payload: value,
  };
};

export const ordenAlfabetico = (value) => {
  return {
    type: ORDEN_ALFABETICO,
    payload: value,
  };
};

export const ordenAtaque = (value) => {
  return {
    type: ORDEN_ATAQUE,
    payload: value,
  };
};

export const updateHome = () => {
  return async function (dispatch) {
    const apidata = await axios.get("/pokemons");
    const pokemons = apidata.data;
    dispatch({ type: UPDATE_HOME, payload: pokemons });
  };
};

export const getUpdatePokemon = (id) => {
  return {
    type: GET_UPDATE_POKEMON,
    payload: id,
  };
};

export const clearUpdate = () => {
  return {
    type: CLEAR_UPDATE,
  };
};
