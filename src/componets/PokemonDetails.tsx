import { Button } from "@mui/material";
import style from "./css/pokemonDetails.module.css";
interface Dado {
  type: {
    name: string;
  };
}
interface Props {
  dadosNome: string;
  dadosTypes: Dado[];
  dadosSprite: string;
  addPokemon: (dadosNome: string) => void;
}

export const PokemonDetails: React.FC<Props> = ({
  dadosNome,
  dadosTypes,
  dadosSprite,
  addPokemon,
}) => {
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addPokemon(dadosNome);
  };

  return (
    <div className={style.pokemonDetails}>
      <div className={style.pokemonDetailsResult}>
        <h2>Result :</h2>
        <h1>{dadosNome.charAt(0).toUpperCase() + dadosNome.slice(1)}</h1>
        <h3>Types :</h3>
        <ul>
          {dadosTypes.map((dado, index) => (
            <li key={index}>{dado.type.name.toUpperCase()}</li>
          ))}
        </ul>
        <h3>Image :</h3>
        <img src={dadosSprite} alt="Pokemon imagem" />
      </div>
      <div className={style.pokemonDetailsadd}>
        <form onSubmit={handleAdd}>
          <Button color="success" variant="contained" type="submit">
            Add to Pokedex
          </Button>
        </form>
      </div>
    </div>
  );
};
