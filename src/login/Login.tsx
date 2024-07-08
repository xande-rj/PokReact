import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";

import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';


import style from './login.module.css'
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<any>("");
  const [error, setError] = useState(Boolean);
  const [loading, setLoading] = useState(false);

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
        
          {loading && <CircularProgress />}

          <span>{error && "Erro ao Entra na conta"}</span>

          <form>
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
            <Button variant="contained" color="success" onClick={onLogin} >
              Login
            </Button>
            <Button 
            onClick={() => navigate("/cadastro")}
            variant="contained"
            color="info"
          >
            Sign up
          </Button>
          </form>
          
     
          
          
          {users.length > 0 && (
            <>
              <Button
                onClick={() => navigate("/api")}
                variant="contained"
                color="warning"
              >
                Pokemon api <CatchingPokemonIcon></CatchingPokemonIcon>
              </Button>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
         </div>
    </>
  );
}
