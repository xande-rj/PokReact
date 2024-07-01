import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    <ul>
      {pokemonData.map((pokemon, index) => (
        <li key={index}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          <br />
          <img src={pokemon.sprite} alt={pokemon.name} />
          <br />
          <Button 
            variant="outlined" 
            onClick={() => navigate(`/api-detalhes/${pokemon.name}`) }
            >
            Detalhes
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={() => removePokemon(pokemon.name)}>
            Remover
          </Button>
        </li>
      ))}
    </ul>
  );
};
