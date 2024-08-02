// Importando arquivos
import styled from "styled-components";
import ReactPlayer from "react-player";
import translate from "/Tradutor-de-Arquivos.mp4"
import estatisticas from "/Estatisticas.mp4"
import looker from "/Looker-JD.mp4"
import ranking from "/Ranking.mp4"
import Button from "../components/Button";
import { Link } from "react-router-dom";

// styled component div
const Home = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center; 
`

// styled component Link To
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: block;
  width: 100%;
  height: 100%;
  padding-top: 7.5px;
`

// styled component div-video
const Video = styled.div`
  margin: 20px;
  padding: 10px;
  background-color: #3498db; 
  border-radius: 20px;

`

// styled component React Plater
const RoundedReactPlayer = styled(ReactPlayer)`
  border-radius: 15px;
  overflow: hidden;
  
`

// styled component title
const Title = styled.h3`
  text-align: center;
  height: 5px;
`

// Função retornando Pagina home customizada
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
        <Title>Tradutor de dados</Title>
        <RoundedReactPlayer url={translate} controls={true} height="400px" width="600px" volume={0} loop={true}/>
        <p>Site responsável pela tradução de arquivos .xls ou .xlsx &#40;Planilhas&#41;</p>
        <Button>
          <StyledLink to="admin/translate">Acessar</StyledLink>
        </Button>
      </Video>
    
      <Video> 
        <Title>Ranking</Title>
        <RoundedReactPlayer url={ranking} controls={true} height="400px" width="600px" volume={0} loop={true}/>
        <p>Site responsável por rankear alunos de acordo com seus interesses</p>
        <Button>
          <StyledLink to="admin/ranking">Acessar</StyledLink>
        </Button>
      </Video>
    </Home>

    <Home>
      <Video>
        <Title>Looker Studio</Title>
        <RoundedReactPlayer url={looker} controls={true} height="400px" width="600px" volume={0} loop={true}/>
        <p>Dashboard Looker Studio, com 23 gráficos e base de dados em planilha</p>
        <Button>
          <StyledLink to="https://lookerstudio.google.com/u/0/reporting/aa2d52b9-deea-4eea-9200-61f48a929d65/page/DAH2D" target="_blank">Acessar</StyledLink>
        </Button>
      </Video>

      <Video> 
        <Title>Estátisticas</Title>
        <RoundedReactPlayer url={estatisticas} controls={true} height="400px" width="600px" volume={0} loop={true}/>
        <p>Análise de gráficos de forma complementar ao dashboard Looker Studio</p>
        <Button>
          <StyledLink to="https://dashboardd-jd.netlify.app/">Acessar</StyledLink>
        </Button>
      </Video>
    </Home>
    </>
  )
}