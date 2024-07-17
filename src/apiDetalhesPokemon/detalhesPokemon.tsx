import {  Button,  ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./detalhesPokemon.module.css";

import themes from "./theme"

export default function detalhesPokemon() {
  const { name } = useParams();
  const [dadosTypes, setDadosTypes] = useState<any[]>([]);
  const [dadosAbilities, setDadosAbilities] = useState<any[]>([]);
  const [dadosMove, setDadosMoves] = useState<any[]>([]);
  const [dadosSprite, setDadosSprite] = useState<string>("");
  const navigate = useNavigate();
  const [dadosNome, setDadosNome] = useState("");

  useEffect(() => {
    async function pegarDados(nome: any) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
      const data = await response.json();
      setDadosNome(data.name);

      setDadosTypes(data.types);
      setDadosSprite(data.sprites.front_default);
      setDadosAbilities(data.abilities);
      setDadosMoves(data.moves);
      console.log(data.moves);
    }
    pegarDados(name);
  }, []);



  return (
    <>
      <div className={style.detailsPokemonScreen}>
        <div className={style.infoScreen}>
          <div>
            <h1>Details Pokémon </h1>
          </div>
          <h2>Name :</h2>
          <span>{dadosNome}</span>

          <h2>Image :</h2>
          <br />
          <img src={dadosSprite} alt="Pokemon Image" />
          <br />
          <h2>Types :</h2>
          <ThemeProvider theme={themes}>
            {dadosTypes.length > 0 &&
              dadosTypes.map((types: any, index) => (
                <>
                  <ul key={index} className={style.ulText}>
                    <Button variant="contained" color={types.type.name}>
                      {types.type.name.charAt(0).toUpperCase() +
                        types.type.name.slice(1)}
                    </Button>
                  </ul>
                </>
              ))}
          </ThemeProvider>
          <h2>Skills :</h2>
          {dadosAbilities.length > 0 &&
            dadosAbilities.map((abilities: any, index) => (
              <ul key={index}>
                {abilities.ability.name.charAt(0).toUpperCase() +
                  abilities.ability.name.slice(1)}
              </ul>
            ))}
          <Button variant="contained" onClick={() => navigate("/api")}>
            voltar
          </Button>
        </div>

        <div className={style.attacksSreen}>
          {/* Ataques:
      {dadosMove.length > 0 &&
        dadosMove.map((move: any, index) => (
          <li key={index}>
            {move.move.name}
            <ul>
              {move.version_group_details[0].move_learn_method.name} : {move.version_group_details[0].level_learned_at}
            </ul>
          </li>
        ))} */}
        </div>
      </div>
    </>
  );
}
