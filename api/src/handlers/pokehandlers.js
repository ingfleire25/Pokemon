const {
    createPokemon,
    getPokemonById,
    getAllPokemons,
    searchPokemonByName,
    updatePokemon,
    deletePokemon,
    getFromDatabase,
    allNamesPokemons,
  } = require("../controllers/pokeControllers"); 
  
  // *Acá vamos a tener todos los handlers del modelo Pokemon:
  const getPokemonsHandler = async (req, res) => {
    try {
      const { name } = req.query;
      const request = name
        ? await searchPokemonByName(name)
        : await getAllPokemons();
      return res.status(200).json(request);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  const getPokemonHandler = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) throw Error("El Id es necesario para buscar el pokemon");
      const source = isNaN(id) ? "bdd" : "api";
      const request = await getPokemonById(id, source);
      return res.status(200).json(request);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  const createPokemonHandler = async (req, res) => {
    try {
      const { name, hp, attack, defense, speed, height, weight, image, type } =
        req.body;
      const request = await createPokemon(
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        type
      );
      return res.status(201).send(request);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  const updatePokemonsHandler = async (req, res) => {
    try {
      const { id, hp, attack, defense, speed, height, weight } = req.body;
      const request = await updatePokemon(
        id,
        hp,
        attack,
        defense,
        speed,
        height,
        weight
      );
      return res.status(200).json(request);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };
  
  const deletePokemonsHandler = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id)
        throw Error("El Id es necesario para buscar el pokemon y eliminarlo");
      const request = await deletePokemon(id);
      return res.status(200).send(request);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  const getDatabaseHandler = async (req, res) => {
    try {
      const request = await getFromDatabase();
      return res.status(200).json(request);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  const getNamesHandler = async (req, res) => {
    try {
      const request = await allNamesPokemons();
      return res.status(200).send(request);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    getPokemonsHandler,
    getPokemonHandler,
    createPokemonHandler,
    updatePokemonsHandler,
    deletePokemonsHandler,
    getDatabaseHandler,
    getNamesHandler,
  };