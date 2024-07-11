import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import style from "./css/pokemonList.module.css"

interface PokemonData {
  name: string;
  sprite: string;
}

interface Props {
  pokemonData: PokemonData[];
  removePokemon: (nome: string) => void;
}

export const PokemonList: React.FC<Props> = ({ pokemonData, removePokemon }) => {
  const navigate = useNavigate()

  return (
    <ul className={style.pokemonlistback}>
      {pokemonData.map((pokemon, index) => (
        <li key={index}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          <br />
          <img src={pokemon.sprite} alt={pokemon.name} />
          <br />
          <Button 
            variant="contained" 
            onClick={() => navigate(`/api-detalhes/${pokemon.name}`) }
            >
            Details
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => removePokemon(pokemon.name)}>
            Remove
          </Button>
        </li>
      ))}
    </ul>
  );
};
