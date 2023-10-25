import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./SearchBar.module.css";
import { useHistory } from "react-router-dom";
import ModalBusqueda from "../../components/ModalBusqueda/ModalBusqueda";

export default function SearchBar() {
  const sugerencias = useSelector((state) => state.names);
  const [request, setRequest] = useState("");
  const [active, setActive] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setRequest(e.target.value.toLowerCase());
  };

  const handleClick = (item) => {
    setRequest(item);
  };

  function onSearch(e) {
    e.preventDefault();
    if (!sugerencias.some((item) => item.startsWith(request))) {
      setRequest("");
      history.push("/searchpage", {
        state: request,
      });
      return setActive(!active);
    } else {
      history.push("/searchpage", {
        state: request,
      });
      setRequest("");
    }
  }

  function handleEnter(e) {
    e.preventDefault();
    if (!sugerencias.some((item) => item.startsWith(request))) {
      setRequest("");
      history.push("/searchpage", {
        state: request,
      });
      return setActive(!active);
    } else {
      history.push("/searchpage", {
        state: request,
      });
      setRequest("");
    }
  }
  return (
    <div className={style.padre}>
      <ModalBusqueda active={active} setActive={setActive} />
      <div className={style.busquedaContenedor}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={style.iconSearch}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          className={style.inputSearch}
          type="search"
          value={request}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEnter(e);
            }
          }}
          placeholder="Buscar..."
        />
        <button className={style.btnSearch} onClick={(e) => onSearch(e)}>
          Buscar
        </button>
      </div>
      <div className={style.dropdown}>
        {sugerencias
          .filter((item) => {
            const busqueda = request.toLowerCase();
            const nombre = item;

            return (
              busqueda && nombre.startsWith(busqueda) && nombre !== busqueda
            );
          })
          .slice(0, 10)
          .map((item, index) => (
            <div
              onClick={() => handleClick(item)}
              className={style.dropdownRow}
              key={index}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
}
