import { useState } from "react";
import * as XLSX from "xlsx";
import { Iaddinf } from "../interfaces/columnsXML";
import exemplo_De_Planilha from "/Exemplo_De_Planilha-png.png";
import ReactPaginate from "react-paginate";
import "../css/FormLabel.css"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

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
  // Trabalhando com dados
  const [data, setData] = useState<Iaddinf[]>([]);
  const [filteredData, setFilteredData] = useState<Iaddinf[]>([]);
  const [usersPerPage] = useState(10);
  const [pageNumberOriginal, setPageNumberOriginal] = useState(0);
  const [course, setCourse] = useState<string>("");

  // Definindo Tamanho do arquivo
  const MAX_FILE_SIZE = 512 * 1024;

  // Constante de Leitura do arquivo e validações
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validação
      if (file.size > MAX_FILE_SIZE) {
        toast.error("O arquivo é muito grande. O tamanho máximo permitido é 512KB.");
        return;
      }

      // Lendo arquivo
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
            toast.success("Arquivo carregado com sucesso!")
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        toast.error("Selecione um arquivo .xls ou .xlsx!")
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

  const interestCategoryMap : {[key: string] : string[]} = {
    "Programação": ["Desenvolvimento", "Web"]
  }

  const rankedStudents = (course: string) =>{
    let relatedInterest: string[] = [];
    for(const [interest, course  ] of Object.entries(interestCategoryMap)) {
      if(course.map(c = c.toLowerCase()).includes(course.toLowerCase())) {
        relatedInterest = interestCategoryMap[interest]
        break
      }
    }
  }

  // Algoritmo de Ranking
  const rankStudents = (course: string) => {
    const relatedStudents = data.filter(student =>
      student.Interesse.toLowerCase().includes(course.toLowerCase())
    );
    const unrelatedStudents = data.filter(student =>
      !student.Interesse.toLowerCase().includes(course.toLowerCase())
    );

    setFilteredData([...relatedStudents, ...unrelatedStudents]);
  };

  // React-Paginate (Primeira Lista)
  const handlePageClickOriginal = ({ selected }: { selected: number }) => {
    setPageNumberOriginal(selected);
  };

  // Constantes React-Paginate Config
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
        
        {/* Input de seleção de arquivo */}
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

      {/* Caso exista um arquivo compatível, após a leitura obtendo valores maiores que 0 irá ser adicionado a lista dos dados e opções de filtragens */}
      {data.length > 0 && (
        <Container>
          <Title>Dados da Planilha:</Title>
          <input 
            type="text" 
            placeholder="Digite o curso (ex: Java)" 
            value={course} 
            onChange={(e) => setCourse(e.target.value)} 
          />
          <button onClick={() => rankStudents(course)}>Rankear Alunos</button>
          <ContainerTable> {/* Primeira tabela de dados lidos */}
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
          {/* React-Paginate Config */}
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
