import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card(props) {
  const { id } = props;
  return (
    <div>
      <div className={style.contenedorCard}>
        <Link to={`/detail/${id}`} className={style.link}>
          <img src={props.image} className={style.imgCard} alt="Pokemon" />
        </Link>
        <div className={style.titulos}>
          <p className={style.name}>{props.name}</p>
          <div className={style.tipos}>
            {props.type?.map((item, index) => {
              return (
                <p key={index} className={style[item]}>
                  {item}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
