import { useEffect, useRef, useState } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
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
      
          <h1> Login </h1>   
        
          {loading && <CircularProgress />}

          <span>{error && "Erro ao Entra na conta"}</span>

          <form>
            <label>
              Usuario :
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
              Senha : 
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
          </form>
          
     
          <Button 
            onClick={() => navigate("/cadastro")}
            variant="contained"
            color="info"
          >
            Cadastro
          </Button>
          
          {users.length > 0 && (
            <>
              <Button
                onClick={() => navigate("/api")}
                variant="contained"
                color="warning"
              >
                Pokemon api
              </Button>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
         
    </>
  );
}
