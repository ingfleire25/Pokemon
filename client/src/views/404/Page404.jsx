import React from "react";
import { Link } from "react-router-dom";
import style from "./Page404.module.css";

export default function Page404() {
  return (
    <div className={style.contenedor404}>
      <h2 className={style.aviso}>Página no encontrada</h2>
      <h3 className={style.error}>Error 404</h3>
      <Link className={style.regresar} to="/home">
        Volver a la página de inicio
      </Link>
    </div>
  );
}
