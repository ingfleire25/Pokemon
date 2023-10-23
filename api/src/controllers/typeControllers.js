const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { itemFilter } = require("./pokeControllers");

// *Este controller permite realizar una consulta a la Api para traerme los pokemon por tipo y guardarlos enla base de datos:
const searchByType = async () => {
  const pokemonDatabase = await Type.findAll();
  if (pokemonDatabase.length > 10) {
    let filtro = pokemonDatabase.map((item) => item.type);
    return filtro;
  } else {
    const request = await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
      .then((res) => res.data.results);

    const subRequest = request.map((item) => axios.get(item.url));
    const urls = await axios.all(subRequest);
    const details = urls.map((item) => item.data);

    // *apiPokemons es el array de objetos ya estructurado que se va a la base de datos:
    const apiPokemons = details
      .map((item) => itemFilter(item))
      .map((item) => item.type)
      .flat();
    // *Guardamos todos los tipos obtenidos de la request:
    let setTypes = new Set(apiPokemons);
    // apiPokemons.map((item) => Type.findOrCreate({ where: { type: item } }));
    await setTypes.forEach(function (item) {
      Type.findOrCreate({ where: { type: item } });
    });

    const pokemonDatabase = await Type.findAll();
    let filtro = pokemonDatabase.map((item) => item.type);
    return filtro;
  }
};

module.exports = {
  searchByType,
};