import React, { useEffect } from "react";
import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import gengar from "../../Imgs/LandingGalery/gengar.png";
import gengar2 from "../../Imgs/LandingGalery/gengar2.png";
import gengar3 from "../../Imgs/LandingGalery/gengar3.png";
import gengar4 from "../../Imgs/LandingGalery/gengar4.png";
import gengar5 from "../../Imgs/LandingGalery/gengar5.png";
import gengar6 from "../../Imgs/LandingGalery/gengar6.png";
import gengar7 from "../../Imgs/LandingGalery/gengar7.png";
import gengar8 from "../../Imgs/LandingGalery/gengar8.png";
import gengar9 from "../../Imgs/LandingGalery/gengar9.png";
import gengar10 from "../../Imgs/LandingGalery/gengar10.png";
import { useDispatch } from "react-redux";
import { getAllPokemons, allNames } from "../../redux/actions";

export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(allNames());
  }, [dispatch]);
  return (
    <div className={style.landingContenedor}>
      <div className={style.texto}>
        <h1 className={style.dos}>
          <strong>PokeApi</strong>
        </h1>
        <h1 className={style.tres}> de Moyobear...</h1>
      </div>
      <div className={style.galeria}>
        <img src={gengar} alt="gengar_1" />
        <img src={gengar2} alt="gengar_2" />
        <img src={gengar3} alt="gengar_3" />
        <img src={gengar4} alt="gengar_4" />
        <img src={gengar5} alt="gengar_5" />
        <img src={gengar6} alt="gengar_6" />
        <img src={gengar7} alt="gengar_7" />
        <img src={gengar8} alt="gengar_8" />
        <img src={gengar9} alt="gengar_9" />
        <img src={gengar10} alt="gengar_10" />
      </div>

      <Link to="/home">
        <button className={style.resplandor}>Empezar</button>
      </Link>
    </div>
  );
}
