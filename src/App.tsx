import "./App.css";
import { Outlet } from "react-router-dom";
import StylesHeader from "./components/Body/Header";
import StylesFooter from "./components/Body/Footer";


function App() {
  return (
    <>

    <StylesHeader></StylesHeader>

    <Outlet />
    
    <StylesFooter></StylesFooter>
    </>
  );
}

export default App;
