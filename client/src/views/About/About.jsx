import React from "react";
import style from "./About.module.css";
import foto from "../../Imgs/personal.jpg";

export default function About() {
  return (
    <div className={style.contAbout}>
      <div className={style.info}>
        <div className={style.imagenCont}>
          <img className={style.imagen} src={foto} alt="Foto del creador" />
        </div>
        <div className={style.texto}>
          <h3 className={style.acerca}>Gracias por llegar hasta aquí...</h3>
          <p className={style.palabras}>
            No por el hecho que no me guste el front, significa que deba hacerlo
            mal. Una experiencia bastante enriquecedora, intensa y llena de
            muchos desafíos. Nada que no haya hecho antes pero esto es realmente
            intenso!
          </p>
          <p className={style.palabras}>
            De niño soñaba con hacer cosas como esta... Puedo sentirme
            satisfecho entonces!
          </p>
          <p className={style.nombre}>Jonathan Rodríguez</p>
        </div>
      </div>
    </div>
  );
}
