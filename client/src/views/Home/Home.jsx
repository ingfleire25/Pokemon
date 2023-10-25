import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Paginado from "../../components/Paginado/Paginado";
import style from "./Home.module.css";
import Filter from "../../components/Filter/Filter";

export default function Home() {
  const pokemons = useSelector((state) => state.pokemons);
  const [active, setActive] = useState(false);

  const numPokemons = pokemons?.length;
  const poksXpage = 12;
  const [page, setPage] = useState(0);

  return (
    <div className={style.contenedorHome}>
      {pokemons.length > 1 ? (
        <div className={style.iconFilter} onClick={() => setActive(!active)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={style.icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
          <span className={style.filtro}>Filtros</span>
        </div>
      ) : (
        ""
      )}
      <Filter active={active} setActive={setActive} />

      <CardsContainer page={page} poksXpage={poksXpage} />
      {pokemons.length <= 1 || pokemons.length < 12 ? null : (
        <Paginado
          numPokemons={numPokemons}
          poksXpage={poksXpage}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}
