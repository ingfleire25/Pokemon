const { searchByType } = require("../controllers/typeControllers");

// *Acá vamos a tener todos los handlers del modelo Type:
const getPokemonsTypesHandler = async (req, res) => {
  try {
    const request = await searchByType();
    return res.status(201).json(request);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonsTypesHandler,
};
