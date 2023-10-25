import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsSearchContainers.module.css";
import { useLocation } from "react-router-dom";

export default function CardsSearchContainers() {
  const pokemons = useSelector((state) => state.pokemons);
  const location = useLocation();
  let caracteres = location.state.state;
  const filtro = pokemons.filter((item) => item.name.startsWith(caracteres));

  return (
    <div
      className={filtro.length === 1 ? style.contenedorUnico : style.contenedor}
    >
      {filtro
        ? filtro.map((item) => {
            return (
              <Card
                key={item.id}
                id={item.id}
                image={item.image}
                name={item.name}
                type={item.type}
              />
            );
          })
        : ""}
    </div>
  );
}
