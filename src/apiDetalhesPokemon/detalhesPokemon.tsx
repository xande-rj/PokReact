import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function detalhesPokemon() {
  const { name } = useParams();
  const [dadosTypes, setDadosTypes] = useState<any[]>([]);
  const [dadosAbilities, setDadosAbilities] = useState<any[]>([]);
  const [dadosMove, setDadosMoves] = useState<any[]>([]);
  const [dadosSprite, setDadosSprite] = useState<string>("");
  const navigate = useNavigate()

  useEffect(() => {
    async function pegarDados(nome: any) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
      const data = await response.json();
      const lv = data;
      setDadosTypes(data.types);
      setDadosSprite(data.sprites.front_default);
      setDadosAbilities(data.abilities);
      setDadosMoves(data.moves);
      console.log(lv);
    }
    pegarDados(name);
  }, []);

  return (
    <div>
      <h1>Detalhes do Pokémon</h1>
      <h2>Tipos :</h2>
      {dadosTypes.length > 0 &&
        dadosTypes.map((types: any, index) => (
          <ul key={index}>{types.type.name.toUpperCase()}</ul>
        ))}
      Imagem:
      <img src={dadosSprite} alt="" />
      <br />
      Habilidades:
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
      <br />
      Ataques:
      {dadosMove.length > 0 &&
        dadosMove.map((move: any, index) => (
          <li key={index}>
            {move.move.name}
            <ul>
              {move.version_group_details[0].move_learn_method.name} : {move.version_group_details[0].level_learned_at}
            </ul>
          </li>
        ))}
    </div>
  );
}
