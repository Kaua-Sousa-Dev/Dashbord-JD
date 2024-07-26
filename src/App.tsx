// Importando arquivos
import { Outlet } from "react-router-dom";
import StylesHeader from "./components/Body/Header";
import StylesFooter from "./components/Body/Footer";

// Função App retornando styled components de forma global
function App() {
  return (
    <>

    <StylesHeader></StylesHeader>

    <Outlet /> {/* Styled Component Herdada em toda aplicação */}
    
    <StylesFooter></StylesFooter>
    </>
  );
}

export default App;
