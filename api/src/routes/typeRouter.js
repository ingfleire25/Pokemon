const { Router } = require("express");
const { getPokemonsTypesHandler } = require("../handlers/typesHandlers");

const typeRouter = Router();

// ?Acá está definidas la ruta de types:
typeRouter.get("/", getPokemonsTypesHandler);

module.exports = typeRouter;
