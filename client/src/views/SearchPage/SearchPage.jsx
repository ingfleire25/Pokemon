import React from "react";
import CardsSearchContainers from "../../components/CardsSearchContainer/CardsSearchContainers";
import style from "./SearchPage.module.css";

export default function SearchPage() {
  return (
    <div className={style.contenedorsearch}>
      <CardsSearchContainers />
    </div>
  );
}
