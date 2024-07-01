import { Button } from "@mui/material";

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
      <div>
        <h2>Dados Recebidos da API:</h2>
        <h1>{dadosNome.charAt(0).toUpperCase() + dadosNome.slice(1)}</h1>
        <h3>Tipos :</h3>
        <ul>
          {dadosTypes.map((dado, index) => (
            <li key={index}>{dado.type.name.toUpperCase()}</li>
          ))}
        </ul>
        <h3>Imagem</h3>
        <img src={dadosSprite} alt="Pokemon imagem" />
        <form onSubmit={handleAdd}>
          <Button color="success" variant="outlined" type="submit">
            Adicionar na Pokedex
          </Button>
        </form>
        
      </div>
    );
  };
  
  