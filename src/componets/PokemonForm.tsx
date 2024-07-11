import { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import style from "./css/pokemonForm.module.css"
interface Props {
  enviarDados: (nome: string) => void;
  loading: boolean;
}

export const PokemonForm: React.FC<Props> = ({ enviarDados, loading }) => {
  const [nome, setNome] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    enviarDados(nome);
  };

  return (
    <form onSubmit={handleSubmit} className={style.pokemonForm}>
      <label>
        Name Pokemon : 
        <br />
        <TextField
          label="Name or ID"
          variant="standard"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </label>
      <Button type="submit" variant="contained" disabled={loading}>
        Search
      </Button>
      
      <div className={style.pokemonFormLoading}>
        {loading && <CircularProgress />}
      </div>
      
    </form>
  );
};
