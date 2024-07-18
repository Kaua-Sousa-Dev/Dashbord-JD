import styled from "styled-components";
import P from "../Title/Paragraph";
import logoCTN from "/logo-citinovaBlack.png";
import logoPF from "/Logo_Pref-fonte-branca.png";
import profile1 from "/profile1.jfif"
import profile2 from "/profile2.jfif"
import profile3 from "/naruto.jfif"
import "../../css/cardFooter.css"

const Footer = styled.footer`
    display: flex;
    background-color: #4f3887;
    margin-top: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function StylesFooter() {
  return (
    <>
      <Footer>
      <div className="profile-container">
          <div className="profile-content">
            <div className="card-wrapper">
              <div className="card">
                <div className="image-content">
                  <span className="overlay"></span>
                  <div className="card-image">
                    <img
                      src={profile1}
                      alt="Kauã Sousa Lima"
                      className="card-img"
                    />
                  </div>
                </div>
                <div className="card-content">
                  <p className="name-content">Kauã Sousa Lima</p>
                  <p className="desc-content">Desenvolvedor</p>
                  <button>
                    <a href="https://www.linkedin.com/in/kaua-sousa-dev?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank">
                      Ver mais
                    </a>
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="image-content">
                  <span className="overlay"></span>
                  <div className="card-image">
                    <img
                      src={profile3}
                      alt="João Pedro Batista"
                      className="card-img"
                    />
                  </div>
                </div>
                <div className="card-content">
                  <p className="name-content">João Pedro</p>
                  <p className="desc-content">Desenvolvedor</p>
                  <button>
                    <a href="https://github.com/Kaua-Sousa-Dev" target="_blank">
                      Ver mais
                    </a>
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="image-content">
                  <span className="overlay"></span>
                  <div className="card-image">
                    <img
                      src={profile2}
                      alt="Ana Patrícia"
                      className="card-img"
                    />
                  </div>
                </div>
                <div className="card-content">
                  <p className="name-content">Ana Patrícia</p>
                  <p className="desc-content">Looker Dev</p>
                  <button>
                    <a href="https://www.instagram.com/ana_patricia710/" target="_blank">
                      Ver mais
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img src={logoCTN} alt="Logo CITINOVA" />
        <P>
          Fundação de Ciência, Tecnologia e Inovação de Fortaleza – Citinova
        </P>
        <P>
          Rua dos Pacajús, nº 33 - Praia de Iracema, Fortaleza - CE | CEP:
          60060-520
        </P>
        <img src={logoPF} alt="Logo Prefeitura de Fortaleza" />
      </Footer>
    </>
  );
}
