import React from "react";
import { useHistory } from "react-router-dom";
import style from "./ModalBusqueda.module.css";

export default function ModalBusqueda({ active, setActive }) {
  const history = useHistory();

  function closeModal(active) {
    setActive(!active);
    history.push("/home");
  }
  return (
    <div className={active ? style.containerFormActive : style.containerForm}>
      <div className={style.cont}>
        <h3 className={style.titulo}>No existe Pokemon con ese nombre</h3>
      </div>

      <div className={style.boton}>
        <button className={style.aceptar} onClick={closeModal}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
