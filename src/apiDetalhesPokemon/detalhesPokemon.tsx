import { Button, createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./detalhesPokemon.module.css";

import themes from "../theme";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f36565",
    },
    secondary: {
      main: "#ffff",
    },
  },
});
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
      //console.log(data.abilities);
    }
    pegarDados(name);
  }, []);

  async function mudarSpriteGen(gen: number) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${dadosNome}`
    );
    const data = await response.json();

    const generationMap: { [key: number]: string } = {
      1: "generation-i.red-blue.front_default",
      2: "generation-ii.crystal.front_default",
      3: "generation-iii.firered-leafgreen.front_default",
      4: "generation-iv.platinum.front_default",
      5: "generation-v.black-white.front_default",
      6: "generation-vi.omegaruby-alphasapphire.front_default",
      7: "generation-vii.ultra-sun-ultra-moon.front_default",
    };

    const spritePath = generationMap[gen];
    if (spritePath) {
      const sprite = spritePath
        .split(".")
        .reduce((o, i) => o[i], data.sprites.versions);
      setDadosSprite(sprite);
    } else {
      console.error("Geração não suportada");
    }
  }

  return (
    <>
      <div className={style.detailsPokemonScreen}>
        <div className={style.infoScreen}>
          <div className={style.infoScreenH1}>
            <h1>Details Pokémon </h1>
          </div>
          <h2>
            Name : {dadosNome.charAt(0).toUpperCase() + dadosNome.slice(1)}
          </h2>
          <h2>Image :</h2>
          <br />
          <img src={dadosSprite} alt="Pokemon Image" />
          <br />
          <div className={style.infoScreenGenButtons}>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                onClick={() => mudarSpriteGen(1)}
                color="primary"
              >
                1 gen
              </Button>
              <Button
                variant="contained"
                onClick={() => mudarSpriteGen(2)}
                color="primary"
              >
                2 gen
              </Button>
              <Button
                variant="contained"
                onClick={() => mudarSpriteGen(3)}
                color="primary"
              >
                3 gen
              </Button>
              <Button
                variant="contained"
                onClick={() => mudarSpriteGen(4)}
                color="primary"
              >
                4 gen
              </Button>
              <Button
                variant="contained"
                onClick={() => mudarSpriteGen(5)}
                color="primary"
              >
                5 gen
              </Button>
              <Button
                variant="contained"
                onClick={() => mudarSpriteGen(6)}
                color="primary"
              >
                6 gen
              </Button>
              <Button
                variant="contained"
                onClick={() => mudarSpriteGen(7)}
                color="primary"
              >
                7 gen
              </Button>
            </ThemeProvider>
          </div>
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
            Back
          </Button>
        </div>

        <div className={style.attacksSreen}>
          <h2> Attacks : </h2>
          <div className={style.infoAttacks}>
            <ThemeProvider theme={themes}>
              {dadosMove.length > 0 &&
                dadosMove.map((move: any, index) => (
                  <>
                    <Button
                      key={index}
                      variant="contained"
                      color="fire"
                      size="small"
                    >
                      {move.version_group_details[0].move_learn_method.name} :{" "}
                      {move.version_group_details[0].level_learned_at}
                      {" "}
                      {move.move.name}
                    </Button>
                  </>
                ))}
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
}
