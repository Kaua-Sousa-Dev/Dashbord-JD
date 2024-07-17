import styled from "styled-components";
import ReactPlayer from "react-player";
import translate from "/Monitoramento de dados - Brave 2024-07-17 15-16-38.mp4"
import analytics from "/Analytics-JD.mp4"
import looker from "/Looker-JD.mp4"
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Home = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center; 
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
const Video = styled.div`
  margin: 20px;
  padding: 10px;
  background-color: #feba5a; 
  border-radius: 20px;

`
const RoundedReactPlayer = styled(ReactPlayer)`
  border-radius: 15px;
  overflow: hidden;
`

export default function stylesHome() {
  return(
    <>
    <Home> 
      <h1>Plataformas</h1>
    </Home>
    <Home>
      <p>Escolha uma das plataforma abaixo</p>
    </Home>

    <Home>
      <Video>
        <RoundedReactPlayer url={translate} controls={true} height="400px" width="600px" volume={0}/>
        <p>Site responsável pela tradução de arquivos .xml &#40;Planilhas&#41;</p>
        <Button>
          <StyledLink to="admin/translate">Acessar</StyledLink>
        </Button>
      </Video>
    
      <Video>
        <RoundedReactPlayer url={analytics} controls={true} height="400px" width="550px" volume={0}/>
        <p>Site responsável por fornecer gráficos ao ler arquivos .xml &#40;Planilhas&#41;</p>
        <Button>
          <StyledLink to="admin/analytics">Acessar</StyledLink>
        </Button>
      </Video>
    </Home>

    <Home>
      <Video>
        <RoundedReactPlayer url={looker} controls={true} height="400px" width="600px" volume={0}/>
        <p>Plataforma Looker Studio fornecendo os dados em formato de gráficos</p>
        <Button>
          <StyledLink to="https://lookerstudio.google.com/reporting/261d1c78-f420-4ef5-b09c-de6d8e8ebf7d" target="_blank">Acessar</StyledLink>
        </Button>
      </Video>
    </Home>
    </>
  )
}