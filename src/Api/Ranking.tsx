// importando dados
import { useState } from "react";
import * as XLSX from "xlsx";
import { Iaddinf } from "../interfaces/columnsXML";
import exemplo_De_Planilha from "/Exemplo_De_Planilha-png.png";
import ReactPaginate from "react-paginate";
import "../css/FormLabel.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importando components
import Container from "../components/Body/Container";
import Title from "../components/Title/Title";
import P from "../components/Title/Paragraph";
import ContainerTable from "../components/Body/ContainerTable";
import ListPrinc from "../components/Form/ListPrinc";
import Thead from "../components/Form/Thead";
import Tr from "../components/Form/Tr";
import Th from "../components/Form/Th";
import Tbody from "../components/Form/Tbody";
import Ex_pl from "../components/image/Ex_Pl";
import Td from "../components/Form/Td";

function Ranking() {
  // dados de conversão
  const [data, setData] = useState<Iaddinf[]>([]);
  const [filteredData, setFilteredData] = useState<Iaddinf[]>([]);
  const [usersPerPage] = useState(10);
  const [pageNumberOriginal, setPageNumberOriginal] = useState(0);
  const [course, setCourse] = useState<string>("");

  // tamanho arquivo xls
  const MAX_FILE_SIZE = 512 * 1024;

  // Mapeamento de palavras-chave para interesses
  const keywordMapping = [
    { interest: "programação", keywords: ["java", "python", "c++", "php", "desenvolvedor", "dev", "desenvolvimento", "web", "mysql", "banco de dados", "frontend", "backend", "fullstack", "python", "android", "ios", "gestão de projetos", "mobile", "ruby", "swift", "c#", "go", "kotlin", "r", "sql", "html", "css", "typescript", "rust", "framework", "nosql", "algoritmo"] },

    { interest: "marketing", keywords: ["estratégia digital", "social media", "copywriter", "anúncios", "marca", "análise de mercado", "campanhas", "redes sociais", "publicidade", "branding", "publicidade", "propaganda", "publicidade e propaganda"] },

    { interest: "design", keywords: ["ui", "ux", "photoshop", "gráfico", "design think", "design gráfico", "interface", "experiência de usuário", "interface de usuário", "visual", "logo", "layout", "figma", "after effects", "animação", "motion graphics", "arte digital", "arte", "modelagem", "renderização", "visualização 3D", "graphic design", "design gráfico", "web design", "ilustration", "3D design", "interior design", "packaging design", "print design", "adverting design", "visual design"] },

    { interest: "hardware", keywords: ["manutenção de computadores", "manutenção", "computadores", "montagem", "pc", "pcs", "cabeamento", "configuração de redes", "roteadores", "switches", "redes", "lan", "wan", "protocolos de rede", "eletrônica", "periféricos", "configuração", "dispositivos de entrada/saida", "armazenamento de dados", "hd", "ssd", "sistemas embarcados", "suporte", "suporte técnico", "diagnóstico de hardware", "fontes de alimentação", "impressoras"]},

    { interest: "dados", keywords: ["power bi", "ferramentas google", "análise de dados", "estátisticas", "visualização de dados", "dashboards", "big data", "data", "banco de dados", "sql", "nosql", "modelagem de dados", "banco de dados relacionais", "gerenciamento de dados", "data science", "ciência de dados", "armazenamento de dados", "estruturas de dados", "backup e recuperação", "engenharia de dados", "segurança de dados", "data mining", "processamento de dados", "data analytics", "analytics"]},
    
    { interest: "inteligência artificial", keywords: ["machine learn", "ia", "ai", "data science", "redes neurais", "reconhecimento de fala", "reconhecimento de movimento", "processamento de linguagem natural", "visão computacional", "automação"]},

    { interest: "games", keywords: ["design de jogos", "programação de jogos", "engine de jogos", "unity", "unreal engine", "mecânicas de jogo", "prototipagem de jogos", "balanceamento de jogo", "jogo", "jogos", "scripts para jogos", "otimização de desempenho", "desenvolvimento de jogos", "2D", "3D", "animação de personagens", "personagens", "texturização", "efeitos visuais", "animação facial", "modelagem", "animação", "áudio em jogos", "efeitos sonoros", "música para jogos", "criação de ambientes sonoros", "experiência do usuário em jogos", "desenvolvimento multijogador", "multijogador", "jogos online", "testes e qualidade", "teste de jogos", "mercado de jogos"]},

    { interest: "robótica", keywords: ["controle de robôs", "robôs", "interação humano-robô", "cinemática", "dinâmica", "sensores e atuadores", "reconhecimento de objetos", "redes e sensores", "robôs domésticos", "simulação de robôs"]}
  ];

  // leitura de arquivo e renderização
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // verificação de tamanho
      if (file.size > MAX_FILE_SIZE) {
        toast.error("O arquivo é muito grande. O tamanho máximo permitido é 512KB.");
        return;
      }

      // verificação de arquivo
      const FileType = file.name.split(".").pop()?.toLowerCase();
      if (FileType === "xls" || FileType === "xlsx") {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (evt.target) {
            const bstr = evt.target.result as string;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, {
              defval: "",
              header: 1,
            }) as any[][];
            const mappedData = mapData(data);
            setData(mappedData);
            setFilteredData(mappedData);
            toast.success("Arquivo carregado com sucesso!");
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        toast.error("Selecione um arquivo .xls ou .xlsx!");
      }
    }
  };

  const mapData = (data: any[][]): Iaddinf[] => {
    const headers = data[0];
    return data.slice(1).map((row) => {
      return headers.reduce((acc, header, index) => {
        acc[header] = row[index] || "";
        return acc;
      }, {} as any) as Iaddinf;
    });
  };

  // filtrando interesses
  const findInterest = (keyword: string) => {
    const entry = keywordMapping.find((entry) =>
      entry.keywords.some(k => k.toLowerCase() === keyword.toLowerCase())
    );
    return entry ? entry.interest : null;
  };

  // rankeando estudantes
  const rankStudents = (course: string) => {
    const interest = findInterest(course.toLowerCase());

    if (!interest) {
      toast.error("Nenhuma informação encontrada sobre os dados inseridos!");
      setFilteredData(data);
      return;
    }

    const relatedStudents = data.filter(student =>
      student.Interesse.toLowerCase().includes(interest.toLowerCase())
    );
    const unrelatedStudents = data.filter(student =>
      !student.Interesse.toLowerCase().includes(interest.toLowerCase())
    );

    setFilteredData([...relatedStudents, ...unrelatedStudents]);
  };

  // acionar Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      rankStudents(course);
    }
  };

  // react-paginate
  const handlePageClickOriginal = ({ selected }: { selected: number }) => {
    setPageNumberOriginal(selected);
  };

  const pagesVisitedOriginal = pageNumberOriginal * usersPerPage;

  const currentDataOriginal = filteredData.slice(
    pagesVisitedOriginal,
    pagesVisitedOriginal + usersPerPage
  );
  const pageCountOriginal = Math.ceil(filteredData.length / usersPerPage);

  return (
    <>
      <Container>
        <Title>Ranking: </Title>
        <P>Escolha um arquivo .xls ou .xlsx</P>
        <P>
          Atenção: baseie seu arquivo com a imagem abaixo!, <br /> atentando-se
          ao uso de caracteres especiais
        </P>
        
        <form className="ButtonInput">
          <label htmlFor="arquivo">
            <span>Selecione um arquivo</span>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFile}
              className="upload_file"
              id="arquivo"
            />
          </label>
        </form> 

        <Ex_pl src={exemplo_De_Planilha} alt="Exemplo de Planilha" />
      </Container>

      {data.length > 0 && (
        <Container>
          <Title>Dados da Planilha:</Title>
          <input 
            type="text" 
            placeholder="Digite o curso (ex: Java)" 
            value={course} 
            onChange={(e) => setCourse(e.target.value)} 
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => rankStudents(course)}>Rankear Alunos</button>
          <ContainerTable>
            <ListPrinc>
              <Thead>
                <Tr>
                  <Th>Nome & Nome Social</Th>
                  <Th>CPF</Th>
                  <Th>Gênero</Th>
                  <Th>Nascimento</Th>
                  <Th>Nacionalidade</Th>
                  <Th>DDD & Telefone</Th>
                  <Th>Email</Th>
                  <Th>Nome da Mãe</Th>
                  <Th>Informações de endereço</Th>
                  <Th>Ocupação</Th>
                  <Th>Interesse</Th>
                  <Th>Escolaridade</Th>
                  <Th>Escola Pública</Th>
                  <Th>Renda</Th>
                  <Th>Deficiência</Th>
                  <Th>Filhos</Th>
                  <Th>Código Juventude Digital</Th>
                  <Th>Raça</Th>
                  <Th>Matrícula & Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentDataOriginal.map((user, index) => (
                  <Tr key={index}>
                    <Td>
                      {user.Nome} - {user.NomeSocial}
                    </Td>
                    <Td>{user.Cpf}</Td>
                    <Td>{user.Genero}</Td>
                    <Td>{user.Nascimento}</Td>
                    <Td>{user.Nacionalidade}</Td>
                    <Td>
                      {user.DDD} - {user.Telefone}
                    </Td>
                    <Td>{user.Email}</Td>
                    <Td>{user.Mae}</Td>
                    <Td>
                      {user.Cidade} - {user.Bairro} - {user.Endereco} -{" "}
                      {user.Numero} - {user.Complemento} - {user.Cep}
                    </Td>
                    <Td>{user.Ocupacao}</Td>
                    <Td>{user.Interesse.replaceAll(",", ", ")}</Td>
                    <Td>{user.Escolaridade}</Td>
                    <Td>{user.Publica}</Td>
                    <Td>{user.Renda}</Td>
                    <Td>{user.Deficiencia}</Td>
                    <Td>{user.Filhos}</Td>
                    <Td>{user.CodJuv}</Td>
                    <Td>{user.Raca}</Td>
                    <Td>
                      {user.Matricula} - {user.Status}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </ListPrinc>
          </ContainerTable>
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Próximo"}
            pageCount={pageCountOriginal}
            onPageChange={handlePageClickOriginal}
            containerClassName={"pagination"}
            activeClassName={"active"}
          /> 
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

export default Ranking;