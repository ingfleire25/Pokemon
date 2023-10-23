// *Creamos un Middleware para verificar que nos envían los datos que son obligatorios por el modelo:
const validadorCreate = (req, res, next) => {
    const { name, type } = req.body;
    if (!name)
      return res.status(400).json({ error: "falta el nombre. Dato obligatorio" });
    if (!type)
      return res.status(400).json({ error: "falta el typo. Dato obligatorio" });
  
    next();
  };
  
  // *Creamos un Middleware para verificar que nos envían el id para actualizar un pokemon de la base de datos:
  const validadorUpdate = (req, res, next) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "falta el id" });
  
    next();
  };

  module.exports = {validadorCreate, validadorUpdate}