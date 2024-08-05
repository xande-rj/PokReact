import { Button, createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./detalhesPokemon.module.css";
import themes from "../theme";
import TabelaSimples from './TabelaSimples';

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

export default function DetalhesPokemon() {
  const { name } = useParams();
  const [dadosTypes, setDadosTypes] = useState<any[]>([]);
  const [dadosAbilities, setDadosAbilities] = useState<any[]>([]);
  const [dadosMove, setDadosMoves] = useState<any[]>([]);
  const [dadosSprite, setDadosSprite] = useState<string>("");
  const [allMoves, setAllMoves] = useState<any[]>([]);
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

      // Ordenar os ataques por nível ao carregar os dados
      const sortedMoves = data.moves.sort((a:any, b:any) => {
        const levelA = a.version_group_details[0].level_learned_at;
        const levelB = b.version_group_details[0].level_learned_at;
        return levelA - levelB;
      });

      setDadosMoves(sortedMoves);
      setAllMoves(sortedMoves);
    }
    pegarDados(name);
  }, [name]);

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

  function filtrarAtaquesPorGeracao(gen: string) {
    const ataquesFiltrados = allMoves.filter((move) =>
      move.version_group_details.some(
        (detail:any) => detail.version_group.name === gen
      )
    );
    setDadosMoves(ataquesFiltrados);
  }

  return (
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
              onClick={() => {
                mudarSpriteGen(1);
                filtrarAtaquesPorGeracao("red-blue");
              }}
              color="primary"
            >
              1 gen
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                mudarSpriteGen(2);
                filtrarAtaquesPorGeracao("crystal");
              }}
              color="primary"
            >
              2 gen
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                mudarSpriteGen(3);
                filtrarAtaquesPorGeracao("firered-leafgreen");
              }}
              color="primary"
            >
              3 gen
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                mudarSpriteGen(4);
                filtrarAtaquesPorGeracao("platinum");
              }}
              color="primary"
            >
              4 gen
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                mudarSpriteGen(5);
                filtrarAtaquesPorGeracao("black-white");
              }}
              color="primary"
            >
              5 gen
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                mudarSpriteGen(6);
                filtrarAtaquesPorGeracao("omegaruby-alphasapphire");
              }}
              color="primary"
            >
              6 gen
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                mudarSpriteGen(7);
                filtrarAtaquesPorGeracao("ultra-sun-ultra-moon");
              }}
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
              <ul key={index} className={style.ulText}>
                <Button variant="contained" color={types.type.name}>
                  {types.type.name.charAt(0).toUpperCase() +
                    types.type.name.slice(1)}
                </Button>
              </ul>
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
            {dadosMove.length > 0 ? (
              <TabelaSimples
                data={dadosMove.map((move) => ({
                  name: move.move.name,
                  type: move.version_group_details[0].move_learn_method.name,
                  power: move.version_group_details[0].level_learned_at,
                }))}
              />
            ) : (
              <p>No attacks available for this generation.</p>
            )}
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
