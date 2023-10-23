const { Router } = require("express");
const {
  getPokemonsHandler,
  getPokemonHandler,
  createPokemonHandler,
  updatePokemonsHandler,
  deletePokemonsHandler,
  getDatabaseHandler,
  getNamesHandler,
} = require("../handlers/pokehandlers");

const {
  validadorCreate,
  validadorUpdate,
} = require("../middlewares/validadores");
// ?Acá están definidas las rutas de pokemons:
const pokemonRouter = Router();

// !ESTA RUTA SÓLO TRAE LOS POKEMONS DE LA BASE DE DATOS:
pokemonRouter.get("/pokemondb", getDatabaseHandler);

pokemonRouter.get("/names", getNamesHandler);

pokemonRouter.get("/", getPokemonsHandler);

pokemonRouter.get("/:id", getPokemonHandler);

pokemonRouter.post("/", validadorCreate, createPokemonHandler);

pokemonRouter.put("/", validadorUpdate, updatePokemonsHandler);

pokemonRouter.delete("/:id/delete", deletePokemonsHandler);

module.exports = pokemonRouter;