import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase.ts";
import { doc, setDoc } from "firebase/firestore";
import Button from '@mui/material/Button';
import { CircularProgress } from "@mui/material";

export default function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(Boolean);
  const [user, setUser] = useState(Boolean);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

    const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      timer.current = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const enviar = async (e: any) => {
    e.preventDefault();
    handleButtonClick()
    timer.current = setTimeout(async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        setDoc(doc(db, "users", user.uid), {
          name: name,
          age: age,
          email: email,
        });
        //navigate("/");
        if(user){
          setUser(true)
          setError(false)

        }
        
        console.log("User registered and additional info stored in Firestore");
        signOut(auth).then(() => {
          console.log("Signed out successfully");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError( true)
        console.log(errorCode, errorMessage);
        setUser(false)

      });
    }, 1900);
  };

  

  return (
    <main>
      <section>
        <div>
          <div>
            <h1> Cadastro </h1>
            {loading && <CircularProgress />}
            <span>{error && ('Erro ao cria usuario') }</span>
            <span>{user && ('Usuario Criado Com Exito')}</span>
            <form>
              <div>
                <label>Email :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>
              <div>
                <label>Password :</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"

                />
              </label>
              <br />
              <label>
                Age:
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Current Age"

                />
              </label> <br />
              <Button type="submit" onClick={enviar} variant="contained" color="success">
                Cadastrar
              </Button>
            </form>
            <Button onClick={() => navigate("/")} variant="contained" color="info">Login</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
