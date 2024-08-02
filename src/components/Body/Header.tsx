// Importando Arquivos
import styled from "styled-components";
import TitleHead from "../Title/TitleHead";
import logoJD from "/JD_Logo-Branco.png";
import logoPF from "/Logo_Pref-fonte-branca.png";
import "../../css/img.css"

// Stytled Component Div-Header
const Header = styled.header`
    display: flex;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    padding-bottom: 10px;

    background-color: #00A195;
`
// Função retornando Header Customizado
export default function StylesHeader() {
    return(
        <Header>
        <img src={logoJD} alt="Logo JD" className="Ct"/>
        <TitleHead>Dashbord Juventude Digital</TitleHead>
        <img src={logoPF} alt="LogoPF" className="Pf"/>
        </Header>
    )
}