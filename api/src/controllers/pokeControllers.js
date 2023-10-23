const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

// !Este Helper permite tomar el array de objetos que llega de la api y extraer SOLO las propiedades que requerimos de el:
const itemFilter = (item) => {
  return {
    id: item.id,
    name: item.name,
    hp: item.stats[0].base_stat,
    attack: item.stats[1].base_stat,
    defense: item.stats[2].base_stat,
    speed: item.stats[5].base_stat,
    height: item.height,
    weight: item.weight,
    image: item.sprites.other.dream_world.front_default,
    type:
      item.types.length < 2
        ? [item.types[0].type.name]
        : [item.types[0].type.name, item.types[1].type.name],
    inDataBase: false,
  };
};

const filterDB = (item) => {
  return {
    id: item.id,
    name: item.name,
    hp: item.hp,
    attack: item.attack,
    defense: item.defense,
    speed: item.speed,
    height: item.height,
    weight: item.weight,
    image: item.image,
    type: item.Types.map((element) => element.type).flat(),
    // type: item.Types[0].type,
    inDataBase: item.inDataBase,
  };
};

// *CONTROLLER: Este Helper nos permite traer todos los pokemon exclusivamente de la Base de Datos:
const getFromDatabase = async () => {
  const dbPokemons = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["type"],
      through: { attributes: [] },
    },
  });

  let filtro = dbPokemons.map((item) => filterDB(item));
  return filtro;
};

// Traemos todos los pokemon (Api y BDD):
const getAllPokemons = async () => {
  // *Los de la Base de Datos:
  const dataBasePokemons = await getFromDatabase();
  // *Los de la Api:
  const request = await axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0")
    .then((res) => res.data.results);
  const subRequest = request.map((item) => axios.get(item.url));
  const urls = await axios.all(subRequest);
  const details = urls.map((item) => item.data);
  const apiPokemons = details.map((item) => itemFilter(item));

  return [...dataBasePokemons, ...apiPokemons];
};

// Traemos un pokemon por nombre desde la Api o la BDD:
const searchPokemonByName = async (name) => {
  // *Buscamos en la Base de Datos:
  const pokemonDatabase = await Pokemon.findOne({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Type,
      attributes: ["type"],
      through: { attributes: [] },
    },
  });
  if (pokemonDatabase) {
    let filtro = filterDB(pokemonDatabase);
    return [filtro];
  } else {
    // *Buscamos en la Api:
    const pokemonApiRequest = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemonApi = itemFilter(pokemonApiRequest.data);
    return [pokemonApi];
  }
};

// Traemos un pokemon por Id desde la Api o la BDD:
const getPokemonById = async (id, source) => {
  if (source === "api") {
    const request = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = itemFilter(request.data);
    return pokemon;
  } else {
    const request = await getFromDatabase();
    let filtro = request.filter((item) => item.id === id);
    return filtro[0];
  }
};

// Creamos un pokemon en la BDD:
const createPokemon = async (
  name,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  image,
  type
) => {
  let newPokemon = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
  });

  let typeDb = await Type.findAll({ where: { type: type } });
  await newPokemon.addType(typeDb);

  const request = await Pokemon.findOne({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Type,
      attributes: ["type"],
      through: { attributes: [] },
    },
  });
  let filtro = filterDB(request);
  return filtro;
};

// Ubicamos un pokemon en la BDD y actualizamos sólo los campos que tienen valores por defecto:
const updatePokemon = async (
  id,
  hp,
  attack,
  defense,
  speed,
  height,
  weight
) => {
  const request = await Pokemon.findByPk(id, {
    include: {
      model: Type,
      attributes: ["type"],
      through: { attributes: [] },
    },
  });
  request.set({
    hp: hp,
    attack: attack,
    defense: defense,
    speed: speed,
    height: height,
    weight: weight,
  });
  await request.save();
  let filtro = filterDB(request);
  return filtro;
  // return request;
};

// Eliminamos un pokemon de la Base de Datos ubicándolo por Id:
const deletePokemon = async (id) => {
  const request = await Pokemon.findByPk(id);
  await request.destroy();

  return "El Pokemon fue borrado exitosamente";
};

//Buscamos TODOS los nombres de los pokemons desde la api y la base de datos:
const allNamesPokemons = async () => {
  // *Los de la Base de Datos:
  const dataBasePokemons = await Pokemon.findAll();
  // *Los de la Api:
  const request = await axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0")
    .then((res) => res.data.results);

  const namesBd = dataBasePokemons.map((item) => item.name);
  const namesApi = request.map((item) => item.name);
  return [...namesBd, ...namesApi];
};

module.exports = {
  createPokemon,
  getPokemonById,
  getAllPokemons,
  searchPokemonByName,
  itemFilter,
  updatePokemon,
  deletePokemon,
  getFromDatabase,
  allNamesPokemons,
};
