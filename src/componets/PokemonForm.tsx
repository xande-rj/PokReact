import { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";

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
    <form onSubmit={handleSubmit} className="form">
      <label>
        Nome Pokemon: <br />
        <TextField
          label="Standard"
          variant="standard"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </label>
      <br />
      <Button type="submit" variant="contained" disabled={loading}>
        Enviar
      </Button><br />
      {loading && <CircularProgress />}
    </form>
  );
};
