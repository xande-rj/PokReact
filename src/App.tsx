import Login from "./login/Login";
import ApiPokemon from "./apipokemon/apiPokemon";
import DetalhesPokemon from "./apiDetalhesPokemon/detalhesPokemon";
import Cadastro from "./cadastro/Cadastro";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <section>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/api" element={<ApiPokemon />} />
            <Route path="/api-detalhes/:name" element={<DetalhesPokemon />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </section>
      </Router>
    </>
  );
}

export default App;
