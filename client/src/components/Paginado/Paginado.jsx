import React from "react";
import style from "./Paginado.module.css";
import { animateScroll as scroll } from "react-scroll";

export default function Paginado({ page, numPokemons, poksXpage, setPage }) {
  let pages = [];

  for (let i = 0; i < Math.ceil(numPokemons / poksXpage); i++) {
    pages.push(i);
  }

  const previus = () => {
    scroll.scrollToTop();
    let prevPage = page - 1;
    if (page <= 0) return;
    setPage(prevPage);
  };

  const next = () => {
    scroll.scrollToTop();
    let newPage = page + 1;
    if (newPage * poksXpage >= numPokemons) return;
    setPage(newPage);
  };

  const onChange = (e) => {
    scroll.scrollToTop();
    setPage(Number(e.target.value));
  };

  return (
    <div className={style.contPage}>
      <button className={style.anterior} onClick={previus}>
        Prev
      </button>
      {pages.map((item, index) => (
        <button
          className={style.numero}
          key={index}
          onClick={onChange}
          value={item}
        >
          {item}
        </button>
      ))}
      <em className={style.actual}>{page}</em>
      <button className={style.previo} onClick={next}>
        Next
      </button>
    </div>
  );
}
