import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import style from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonDetail,
  clearDetail,
  deletePokemon,
} from "../../redux/actions";
import Loadding from "../../components/Loadding/Loadding";
import Modal from "../../components/Modal/Modal";

export default function Detail() {
  const { id } = useParams();
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  let motivo = "eliminado";

  useEffect(() => {
    dispatch(getPokemonDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const eliminarPok = (id) => {
    setActive(!active);
    dispatch(deletePokemon(id));
  };

  return (
    <div className={active ? style.padreActive : style.padre}>
      {!detail ? (
        <Loadding />
      ) : (
        <div className={style.detalles}>
          <div className={style.imagen}>
            <img className={style.image} src={detail.image} alt={detail.name} />
          </div>
          <div className={style.info}>
            <div>
              <h2 className={style.nombre}>{detail.name}</h2>
              <h2 className={style.id}>
                Id:{" "}
                {typeof detail.id !== "number" ? "Base de datos" : detail.id}
              </h2>
            </div>

            <div className={style.grupo}>
              <h5 className={style.estadistica}>Vida:</h5>
              <em className={style.valor}>{detail.hp}</em>
            </div>
            <div className={style.grupo}>
              <h5 className={style.estadistica}>Ataque:</h5>
              <em className={style.valor}>{detail.attack}</em>
            </div>
            <div className={style.grupo}>
              <h5 className={style.estadistica}>Defensa:</h5>
              <em className={style.valor}>{detail.defense}</em>
            </div>
            <div className={style.grupo}>
              <h5 className={style.estadistica}>Velocidad:</h5>
              <em className={style.valor}>{detail.speed}</em>
            </div>
            <div className={style.grupo}>
              <h5 className={style.estadistica}>Altura:</h5>
              <em className={style.valor}>{detail.height} ft</em>
            </div>
            <div className={style.grupo}>
              <h5 className={style.estadistica}>Peso:</h5>
              <em className={style.valor}>{detail.weight} kg</em>
            </div>

            <h5 className={style.tipo}>
              Tipo{detail.type?.length > 1 ? "s" : ""}:
              {detail.type?.map((item, index) => {
                return (
                  <em className={style[item]} key={index}>
                    {" "}
                    {item}{" "}
                  </em>
                );
              })}
            </h5>
          </div>
          <Modal active={active} setActive={setActive} motivo={motivo} />
        </div>
      )}
      {!detail ? null : (
        <div className={style.botonera}>
          <Link to={"/home"}>
            <button className={style.botonAtras}>Atras</button>
          </Link>

          {detail.inDataBase === true ? (
            <div className={style.btnDb}>
              <button
                onClick={() => eliminarPok(detail.id)}
                className={style.botonDelete}
              >
                Eliminar
              </button>
              <Link to={`/update/${detail.id}`}>
                <button className={style.botonUpdate}>Actualizar</button>
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
