import MenuSuperior from "./components/MenuSuperior";
import ListaCandidatas from "./components/ListaCandidatas";
import InclusaoCandidatas from "./components/InclusaoCandidatas";
import GerenciaCandidatas from "./components/GerenciaCandidatas";

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <MenuSuperior />
      <Routes>
        <Route path="/" element={<ListaCandidatas />} />
        <Route path="inclusao" element={<InclusaoCandidatas />} />
        <Route path="gerencia" element={<GerenciaCandidatas />} />
      </Routes>
    </>
  );
};

export default App;
