import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "../../Imgs/Logo.png";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  return (
    <div className={style.mainContainer}>
      <div className={style.searchContainer}>
        <Link to="/">
          <img className={style.logo} src={logo} alt="Logo_barra" />
        </Link>
        <SearchBar />
      </div>
      <div className={style.linksContainer}>
        <Link to="/home" className={style.link}>
          Inicio
        </Link>
        <Link to="/create" className={style.link}>
          Crear
        </Link>
        {/* <Link to="/update" className={style.link}>
          Actualizar
        </Link> */}
        <Link to="/about" className={style.link}>
          Acerca de
        </Link>
      </div>
    </div>
  );
}
