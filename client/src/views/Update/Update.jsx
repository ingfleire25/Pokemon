import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loadding from "../../components/Loadding/Loadding";
import {
  getUpdatePokemon,
  clearUpdate,
  updatePokemon,
} from "../../redux/actions";
import style from "./Update.module.css";
import Modal from "../../components/Modal/Modal";

export default function Update() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUpdatePokemon(id));
    return () => {
      dispatch(clearUpdate());
    };
  }, [dispatch, id]);

  const update = useSelector((state) => state.update);
  const [actualizar, setActualizar] = useState({
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    height: 50,
    weight: 50,
  });
  const [active, setActive] = useState(false);

  let motivo = "actualizado";

  function handlerChange(e) {
    setActualizar({
      ...actualizar,
      [e.target.name]: Number(e.target.value),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setActive(!active);
    let info = {
      ...actualizar,
      id: update.id,
    };

    dispatch(updatePokemon(info));

    setActualizar({
      hp: 50,
      attack: 50,
      defense: 50,
      speed: 50,
      height: 50,
      weight: 50,
    });
  }

  return (
    <div className={!update ? style.loadding : null}>
      {!update ? (
        <Loadding />
      ) : (
        <div
          className={
            active ? style.contenedorUpdateActive : style.contenedorUpdate
          }
        >
          <div className={style.contenido}>
            <div className={style.descripcion}>
              <h2>{update.name}</h2>
              {/* <h3>Id: {update.id}</h3> */}
              <div className={style.tipos}>
                {update.type?.map((item, index) => {
                  return (
                    <p key={index} className={style[item]}>
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className={style.imagenCont}>
              <img src={update.image} alt={update.name} />
            </div>
          </div>
          <Modal active={active} setActive={setActive} motivo={motivo} />
          <form className={style.formulario} onSubmit={handleSubmit}>
            <div className={style.grupo}>
              <div className={style.separador}>
                <label className={style.etiquetaForm} htmlFor="hp">
                  Vida
                </label>
                <p className={style.numero}>{actualizar.hp}</p>
              </div>
              <input
                className={style.inputForm}
                name="hp"
                id="hp"
                onChange={(e) => handlerChange(e)}
                value={actualizar.hp}
                type="range"
                min="10"
                max="200"
              />
            </div>

            <div className={style.grupo}>
              <div className={style.separador}>
                <label className={style.etiquetaForm} htmlFor="attack">
                  Ataque
                </label>
                <p className={style.numero}>{actualizar.attack}</p>
              </div>
              <input
                className={style.inputForm}
                name="attack"
                id="attack"
                onChange={(e) => handlerChange(e)}
                value={actualizar.attack}
                type="range"
                min="10"
                max="200"
              />
            </div>

            <div className={style.grupo}>
              <div className={style.separador}>
                <label className={style.etiquetaForm} htmlFor="defense">
                  Defensa
                </label>
                <p className={style.numero}>{actualizar.defense}</p>
              </div>
              <input
                className={style.inputForm}
                name="defense"
                id="defense"
                onChange={(e) => handlerChange(e)}
                value={actualizar.defense}
                type="range"
                min="10"
                max="200"
              />
            </div>

            <div className={style.grupo}>
              <div className={style.separador}>
                <label className={style.etiquetaForm} htmlFor="speed">
                  Velocidad
                </label>
                <p className={style.numero}>{actualizar.speed}</p>
              </div>
              <input
                className={style.inputForm}
                name="speed"
                id="speed"
                onChange={(e) => handlerChange(e)}
                value={actualizar.speed}
                type="range"
                min="10"
                max="200"
              />
            </div>

            <div className={style.grupo}>
              <div className={style.separador}>
                <label className={style.etiquetaForm} htmlFor="height">
                  Altura ft
                </label>
                <p className={style.numero}>{actualizar.height}</p>
              </div>
              <input
                className={style.inputForm}
                name="height"
                id="height"
                onChange={(e) => handlerChange(e)}
                value={actualizar.height}
                type="range"
                min="10"
                max="100"
              />
            </div>

            <div className={style.grupo}>
              <div className={style.separador}>
                <label className={style.etiquetaForm} htmlFor="weight">
                  Peso kg
                </label>
                <p className={style.numero}>{actualizar.weight}</p>
              </div>
              <input
                className={style.inputForm}
                name="weight"
                id="weight"
                onChange={(e) => handlerChange(e)}
                value={actualizar.weight}
                type="range"
                min="10"
                max="900"
              />
            </div>

            <button className={style.btnActualizar} type="submit">
              Actualizar Pokemon
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
