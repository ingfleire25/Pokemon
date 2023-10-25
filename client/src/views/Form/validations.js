function validate(input) {
  let errors = {};
  // if (!input.name) errors.name = "El nombre del pokemon es requerido";
  if (!/[A-Za-z]{3,10}/.test(input.name))
    errors.name = "El nombre debe tener de 3 a 10 caracteres";
  if (/[0-9]/.test(input.name))
    errors.name = "El nombre no puede tener números";
  if (input.image === "")
    errors.image = "Debes generar uan imagen y pegarla en el campo de imagen";
  if (input.type === "") errors.type = "El tipo del pokemon es requerido";
  if (input.type.length > 2)
    errors.type = "El pokemón sólo puede tener máximo 2 tipos";

  return errors;
}

export default validate;
