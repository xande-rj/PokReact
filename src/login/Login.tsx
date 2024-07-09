import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";

import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

import style from "./login.module.css";
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<any>("");
  const [error, setError] = useState(Boolean);
  const [loading, setLoading] = useState(false);
  const [dadosNome, setDadosNome] = useState("");
  const [dadosSprite, setDadosSprite] = useState<string>("");

  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setError(false);

        const uid = user;
        setUsers(uid.email);
      }
    });
  }, []);

  useEffect(() => {
    const handlePageUpdate = async () => {
      console.log("Página atualizada");
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 100)}`
        );
        const data = await response.json();
        console.log(data.sprites.front_default);
        setDadosNome(data.name);
        setDadosSprite(data.sprites.front_default);
      } catch (e) {}
    };

    handlePageUpdate();
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      timer.current = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const onLogin = async (e: any) => {
    handleButtonClick();
    e.preventDefault();
    timer.current = setTimeout(async () => {
      await signInWithEmailAndPassword(auth, email, password).catch((error) => {
        setError(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    }, 1900);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.reload();
      console.log("Signed out successfully");
    });
  };

  return (
    <>
      <div className={style.bodyLogin}>
        <h1> Login </h1>

        <form>
          <span>{error && "Erro ao Entra na conta"}</span>
          <label>
            E-mail :
            <br />
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password :
            <br />
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <Button variant="contained" color="success" onClick={onLogin}>
            Login
          </Button>
          <Button
            onClick={() => navigate("/cadastro")}
            variant="contained"
            color="info"
          >
            Sign up
          </Button>
          {loading && <CircularProgress />}
        </form>
        {users.length > 0 ? (
          <>
            <div></div>
            <div className={style.pokedexScreen}>
              {dadosNome.charAt(0).toUpperCase() + dadosNome.slice(1)}
              <img src={dadosSprite} alt="Pokemon imagem" />
            </div>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
            <Button
              onClick={() => navigate("/api")}
              variant="contained"
              color="warning"
            >
              Pokemon api <CatchingPokemonIcon />
            </Button>
          </>
        ) : (
          <>
            <div></div>
            <div className={style.pokedexScreen}>
              {dadosNome.charAt(0).toUpperCase() + dadosNome.slice(1)} 
              <div>
                <img src={dadosSprite} alt="Pokemon imagem" />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
