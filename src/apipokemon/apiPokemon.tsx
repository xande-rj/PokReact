import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { usePokemon } from "../hooks/usePokemon";
import { PokemonForm } from "../componets/PokemonForm";
import { PokemonList } from "../componets/PokemonList";
import { PokemonDetails } from "../componets/PokemonDetails";
import { LogoutButton } from "../componets/LogoutButton";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import { green } from "@mui/material/colors";
import "./style.css";
import { useNavigate } from "react-router-dom";


const theme = createTheme({
  palette: {
    primary: green,
  },
});

interface Dado {
  type: {
    name: string;
  };
}

export default function ApiPokemon() {
  const { userEmail, userId, handleLogout } = useAuth();
  const {  pokemonData, addPokemon, removePokemon } = usePokemon(userId);

  const [dadosTypes, setDadosTypes] = useState<Dado[]>([]);
  const [dadosNome, setDadosNome] = useState("");
  const [dadosSprite, setDadosSprite] = useState<string>("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const navigate = useNavigate()
  const enviarDados = async (nome: string) => {
    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
        const data = await response.json();
        setDadosTypes(data.types);
        setDadosNome(data.name);
        setDadosSprite(data.sprites.front_default);
        console.log(dadosTypes)
        setError(false);
      } catch (error) {
        setError(true);
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {userEmail ? (
        <>
          <PokemonForm enviarDados={enviarDados} loading={loading} />
          <PokemonList pokemonData={pokemonData} removePokemon={removePokemon} />
          {dadosTypes.length > 0 && (
            <PokemonDetails
              dadosNome={dadosNome}
              dadosTypes={dadosTypes}
              dadosSprite={dadosSprite}
              addPokemon={addPokemon}
            />
          )}
          {error && <span>Erro na Requisição</span>}
          <LogoutButton handleLogout={handleLogout} />
        </>
      ) : (
        <>
          <h1>Cadastre-se</h1>
          <Button variant="contained" onClick={() => navigate("/")}>
            Login
          </Button>
        </>
      )}
    </ThemeProvider>
  );
}