import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterType,
  filterOrigen,
  ordenAlfabetico,
  ordenAtaque,
  clearHome,
} from "../../redux/actions";
import style from "./Filter.module.css";

export default function Filter({ active, setActive }) {
  const dispatch = useDispatch();
  const [reset, setReset] = useState({
    Tipo: "",
    Origen: "",
    Alfabeto: "",
    Ataque: "",
  });

  function handlerFilterType(e) {
    setActive(!active);
    dispatch(filterType(e.target.value));
    setReset({
      Tipo: e.target.value,
      Origen: "",
      Alfabeto: "",
      Ataque: "",
    });
  }

  function handlerFilterOrigen(e) {
    setActive(!active);
    dispatch(filterOrigen(e.target.value));
    setReset({
      Tipo: "",
      Origen: e.target.value,
      Alfabeto: "",
      Ataque: "",
    });
  }

  function handlerFilterAlf(e) {
    setActive(!active);
    dispatch(ordenAlfabetico(e.target.value));
    setReset({
      Tipo: "",
      Origen: "",
      Alfabeto: e.target.value,
      Ataque: "",
    });
  }

  function handlerFilterAtaq(e) {
    setActive(!active);
    dispatch(ordenAtaque(e.target.value));
    setReset({
      Tipo: "",
      Origen: "",
      Alfabeto: "",
      Ataque: e.target.value,
    });
  }

  function resetFilter(e) {
    setActive(!active);
    setReset({
      Tipo: "",
      Origen: "",
      Alfabeto: "",
      Ataque: "",
    });
    dispatch(clearHome());
  }

  return (
    <div
      className={active ? style.containerFilterActive : style.containerFilter}
    >
      <div className={style.filterByType}>
        <span className={style.segmento}>Selecciona el Tipo:</span>
        <select
          name="Tipo"
          className={style.selectorType}
          value={reset.Tipo}
          onChange={(e) => handlerFilterType(e)}
        >
          <option value="">Selecciona...</option>
          <option value="all">Todos</option>
          <option value="grass">Grass</option>
          <option value="poison">Poison</option>
          <option value="water">Water</option>
          <option value="fire">Fire</option>
          <option value="flying">Flying</option>
          <option value="normal">Normal</option>
          <option value="bug">Bug</option>
          <option value="electric">Electric</option>
          <option value="ground">Ground</option>
          <option value="fighting">Fighting</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="steel">Steel</option>
          <option value="ice">Ice</option>
          <option value="ghost">Ghost</option>
          <option value="fairy">Fairy</option>
        </select>
      </div>

      <div className={style.filterByType}>
        <span className={style.segmento}>Selecciona el Origen:</span>
        <select
          name="Origen"
          className={style.selectorType}
          value={reset.Origen}
          onChange={(e) => handlerFilterOrigen(e)}
        >
          <option value="">Selecciona...</option>
          <option value="all">Todos</option>
          <option value="false">Api</option>
          <option value="true">Mis Pokemons</option>
        </select>
      </div>

      <div className={style.filterByType}>
        <span className={style.segmento}>Ordenar Alfabeticamente:</span>
        <select
          name="Alfabeto"
          className={style.selectorType}
          value={reset.Alfabeto}
          onChange={(e) => handlerFilterAlf(e)}
        >
          <option value="">Selecciona...</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>

      <div className={style.filterByType}>
        <span className={style.segmento}>Ordenar por Ataque:</span>
        <select
          name="Ataque"
          className={style.selectorType}
          value={reset.Ataque}
          onChange={(e) => handlerFilterAtaq(e)}
        >
          <option value="">Selecciona...</option>
          <option value="menor">Más débil</option>
          <option value="mayor">Más fuerte</option>
        </select>
      </div>
      <button className={style.reset} onClick={(e) => resetFilter(e)}>
        Reset
      </button>
    </div>
  );
}
