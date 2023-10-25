import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import pokebola from "../../Imgs/pokeball.png";
import style from "./Form.module.css";
import {
  getAllTypes,
  getAllPokemons,
  createPokemon,
} from "../../redux/actions";
import Loadding from "../../components/Loadding/Loadding";
import Modal from "../../components/Modal/Modal";
// import validate from "./validations";

export default function Form() {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const advertencias = useSelector((state) => state.names);

  function validate(input) {
    let errors = {};
    if (!/[A-Za-z]{3,10}/.test(input.name))
      errors.name = "El nombre debe tener de 3 a 10 caracteres";
    if (/[0-9]/.test(input.name))
      errors.name = "El nombre no puede tener números";
    if (advertencias.includes(input.name)) errors.name = "El nombre ya existe";
    if (input.type === "") errors.type = "El tipo del pokemon es requerido";
    if (input.type.length > 2)
      errors.type = "El pokemón sólo puede tener máximo 2 tipos";

    return errors;
  }

  const [active, setActive] = useState(false);
  let motivo = "creado";

  const [pokemonData, setPokemonData] = useState({
    name: "",
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    height: 50,
    weight: 50,
    type: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    type: "",
  });

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  function getImage(e) {
    e.preventDefault();
    let value = Math.floor(Math.random() * 100);
    let url = `https://lorempokemon.fakerapi.it/pokemon/400/${value}`;
    setImage(url);
    return url;
  }

  function changeHandler(e) {
    setErrors(
      validate({
        ...pokemonData,
        [e.target.name]: e.target.value,
      })
    );

    setPokemonData({
      ...pokemonData,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  }

  function selectHandler(e) {
    setPokemonData({
      ...pokemonData,
      type: [...pokemonData.type, e.target.value],
    });
  }

  function handleDelete(e) {
    let borrar = e.target.innerText;
    setPokemonData({
      ...pokemonData,
      type: pokemonData.type.filter((item) => item !== borrar),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let data = {
      ...pokemonData,
      image,
    };

    dispatch(createPokemon(data));
    setActive(!active);
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length === 0) {
      setPokemonData({
        name: "",
        hp: 50,
        attack: 50,
        defense: 50,
        speed: 50,
        height: 50,
        weight: 50,
        type: [],
      });

      setErrors({
        name: "",
        type: "",
      });
    }
  }

  return (
    <div className={!types.length ? style.loadding : null}>
      {!types.length ? (
        <Loadding />
      ) : (
        <div
          className={active ? style.containerFormActive : style.containerForm}
        >
          <div>
            <div className={style.legend}>
              <legend>Vamos a crear nuestro</legend>
              <legend>
                propio <em> PoKeMon</em>
              </legend>
            </div>
            {!image ? (
              <img
                className={style.pokebola}
                src={pokebola}
                alt="Imagen Pokebola"
              />
            ) : (
              <img className={style.pokemon} src={image} alt="Imagen Pokemon" />
            )}
          </div>
          <form className={style.formulario} onSubmit={handleSubmit}>
            <div className={style.grupo}>
              <label className={style.etiquetaRorm} htmlFor="name">
                Nombre:{" "}
              </label>

              <input
                className={style.inputForm}
                name="name"
                id="name"
                type="text"
                value={pokemonData.name}
                onChange={(e) => changeHandler(e)}
                required
              />
              {errors.name && <p className={style.danger}>{errors.name}</p>}
            </div>

            <div className={style.grupo}>
              <label className={style.etiquetaRorm} htmlFor="type">
                Tipos:
              </label>
              <div>
                {pokemonData.type.length >= 2 ? (
                  ""
                ) : (
                  <select
                    className={style.seleccionar}
                    value={pokemonData.type}
                    onChange={(e) => selectHandler(e)}
                    multiple
                  >
                    <option value="" disabled>
                      Selecciona los tipos de tu Pokemon:
                    </option>
                    {types?.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {errors.type && <p className={style.danger}>{errors.type}</p>}
              <div className={style.seleccionados}>
                {pokemonData.type
                  ? pokemonData.type.map((item, index) => (
                      <div key={index} className={style.elemento}>
                        <p onClick={(e) => handleDelete(e)}>{item}</p>
                      </div>
                    ))
                  : ""}
              </div>
            </div>

            <div className={style.mainBotones}>
              {pokemonData.name && pokemonData.type.length && image ? (
                <button className={style.btnCrear} type="submit">
                  Crear Pokemon
                </button>
              ) : (
                ""
              )}

              <button className={style.btnImagen} onClick={(e) => getImage(e)}>
                {!image ? "Generar Imagen" : "Cambiar imágen"}
              </button>
            </div>
          </form>
          <Modal active={active} setActive={setActive} motivo={motivo} />
        </div>
      )}
    </div>
  );
}
