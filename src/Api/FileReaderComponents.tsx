import { useState } from "react";
import * as XLSX from "xlsx";
import { Iaddinf } from "../interfaces/columnsXML";
import exemplo_De_Planilha from "/Exemplo_De_Planilha-png.png";
import ReactPaginate from "react-paginate";
import "../css/FormLabel.css"

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
import Userdiv from "../components/userPrinc";
import FilterItem from "../components/Filter-item";
import Pagination from "../components/Body/Pagination";
import Button from "../components/Button";

function FileReaderComp() {
  const [data, setData] = useState<Iaddinf[]>([]);
  const [filteredData, setFilteredData] = useState<Iaddinf[]>([]);
  const [filterCriteria, setFilterCriteria] = useState({
    Cpf: "",
    Genero: "",
    Nascimento: "",
    Nacionalidade: "",
    DDD: "",
    Telefone: "",
    Email: "",
    Mae: "",
    Cidade: "",
    Bairro: "",
    Endereco: "",
    Numero: "",
    Complemento: "",
    Cep: "",
    Ocupacao: "",
    Interesse: "",
    Escolaridade: "",
    Publica: "",
    Renda: "",
    Deficiencia: "",
    Filhos: "",
    CodJuv: "",
    Raca: "",
    Status: "",
  });
  const [isFiltered, setIsFiltered] = useState(false);
  const [usersPerPage] = useState(10);
  const [pageNumberOriginal, setPageNumberOriginal] = useState(0);
  const [pageNumberFiltered, setPageNumberFiltered] = useState(0);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
        }
      };
      reader.readAsArrayBuffer(file);
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

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const applyFilter = () => {
    const filtered = data.filter((user) => {
      const matchesCriteria = Object.entries(filterCriteria).every(
        ([key, value]) => {
          if (key === "Interesse") {
            const filtersArray = value.split(/,|\s/);
            const userKey = user[key as keyof Iaddinf];
            const firstMatch = filtersArray.find((filter) => {
              return userKey
                ?.toString()
                ?.toLowerCase()
                ?.includes(filter?.toString()?.toLowerCase());
            });
            return firstMatch != null;
          }
          if (value) {
            return (user[key as keyof Iaddinf] || "")
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase());
          }
          return true;
        }
      );
      return matchesCriteria;
    });
    setFilteredData(filtered);
    setPageNumberFiltered(0);
    setIsFiltered(true);
  };

  const handlePageClickOriginal = ({ selected }: { selected: number }) => {
    setPageNumberOriginal(selected);
  };

  const handlePageClickFiltered = ({ selected }: { selected: number }) => {
    setPageNumberFiltered(selected);
  };

  const pagesVisitedOriginal = pageNumberOriginal * usersPerPage;
  const pagesVisitedFiltered = pageNumberFiltered * usersPerPage;

  const currentDataOriginal = data.slice(
    pagesVisitedOriginal,
    pagesVisitedOriginal + usersPerPage
  );

  const currentDataFiltered = filteredData.slice(
    pagesVisitedFiltered,
    pagesVisitedFiltered + usersPerPage
  );

  const pageCountOriginal = Math.ceil(data.length / usersPerPage);
  const pageCountFiltered = Math.ceil(filteredData.length / usersPerPage);

  return (
    <>
      <Container>
        <Title>Tradutor de Dados: </Title>
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

      {data.length > 0 && (
        <Container>
          <Title>Filtragem:</Title>
          <Userdiv>
            {Object.keys(filterCriteria).map((key) => (
              <FilterItem key={key}>
                <label>{key}: </label>
                {[
                  "Renda",
                  "Deficiencia",
                  "Genero",
                  "Escolaridade",
                  "Publica",
                  "Filhos",
                  "Status",
                ].includes(key) ? (
                  <select name={key} onChange={handleFilterChange}>
                    {Array.from(
                      new Set(
                        data.map((user) => user[key as keyof Iaddinf]).sort()
                      )
                    ).map((option) => (
                      <option
                        key={option}
                        value={option}
                        selected={
                          filterCriteria[key as keyof typeof filterCriteria] ==
                          option
                        }
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={
                      filterCriteria[key as keyof typeof filterCriteria] || ""
                    }
                    onChange={handleFilterChange}
                  />
                )}
              </FilterItem>
            ))}
          </Userdiv>
          <Button onClick={applyFilter}>Aplicar Filtro</Button>
        </Container>
      )}

      {isFiltered && (
        <>
          <Container>
            <Title>Dados Filtrados:</Title>
          </Container>
          <ContainerTable>
            <ListPrinc>
              <Thead>
                <Tr>
                  <Th>Nome & Nome Social</Th>
                  {filterCriteria.Cpf && <Th>CPF</Th>}
                  {filterCriteria.Genero && <Th>Gênero</Th>}
                  {filterCriteria.Nascimento && <Th>Nascimento</Th>}
                  {filterCriteria.Nacionalidade && <Th>Nacionalidade</Th>}
                  {filterCriteria.DDD && <Th>DDD & Telefone</Th>}
                  {filterCriteria.Email && <Th>Email</Th>}
                  {filterCriteria.Mae && <Th>Nome da Mãe</Th>}
                  {(filterCriteria.Cidade ||
                    filterCriteria.Bairro ||
                    filterCriteria.Endereco ||
                    filterCriteria.Numero ||
                    filterCriteria.Complemento ||
                    filterCriteria.Cep) && <Th>Informações de endereço</Th>}
                  {filterCriteria.Ocupacao && <Th>Ocupação</Th>}
                  {filterCriteria.Interesse && <Th>Interesse</Th>}
                  {filterCriteria.Escolaridade && <Th>Escolaridade</Th>}
                  {filterCriteria.Publica && <Th>Escola pública?</Th>}
                  {filterCriteria.Renda && <Th>Renda</Th>}
                  {filterCriteria.Deficiencia && <Th>Deficiência</Th>}
                  {filterCriteria.Filhos && <Th>Filhos</Th>}
                  {filterCriteria.CodJuv && <Th>Código Juventude Digital</Th>}
                  {filterCriteria.Raca && <Th>Raça</Th>}
                  {filterCriteria.Status && <Th>Matrícula & Status</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {currentDataFiltered.map((user, index) => (
                  <Tr key={index}>
                    <Td>
                      {user.Nome} - {user.NomeSocial}
                    </Td>
                    {filterCriteria.Cpf && <Td>{user.Cpf}</Td>}
                    {filterCriteria.Genero && <Td>{user.Genero}</Td>}
                    {filterCriteria.Nascimento && <Td>{user.Nascimento}</Td>}
                    {filterCriteria.Nacionalidade && (
                      <Td>{user.Nacionalidade}</Td>
                    )}
                    {filterCriteria.DDD && <Td>{user.DDD}</Td>}
                    {filterCriteria.Email && <Td>{user.Email}</Td>}
                    {filterCriteria.Mae && <Td>{user.Mae}</Td>}
                    {(filterCriteria.Cidade ||
                      filterCriteria.Bairro ||
                      filterCriteria.Endereco ||
                      filterCriteria.Numero ||
                      filterCriteria.Complemento ||
                      filterCriteria.Cep) && (
                      <Td>
                        {user.Endereco}, {user.Numero}, {user.Complemento},{" "}
                        {user.Bairro}, {user.Cidade} - {user.Cep}
                      </Td>
                    )}
                    {filterCriteria.Ocupacao && <Td>{user.Ocupacao}</Td>}
                    {filterCriteria.Interesse && (
                      <Td>{user.Interesse.replaceAll(",", ", ")}</Td>
                    )}
                    {filterCriteria.Escolaridade && (
                      <Td>{user.Escolaridade}</Td>
                    )}
                    {filterCriteria.Publica && <Td>{user.Publica}</Td>}
                    {filterCriteria.Renda && <Td>{user.Renda}</Td>}
                    {filterCriteria.Deficiencia && <Td>{user.Deficiencia}</Td>}
                    {filterCriteria.Filhos && <Td>{user.Filhos}</Td>}
                    {filterCriteria.CodJuv && <Td>{user.CodJuv}</Td>}
                    {filterCriteria.Raca && <Td>{user.Raca}</Td>}
                    {filterCriteria.Status && (
                      <Td>
                        {user.Matricula} - {user.Status}
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </ListPrinc>
          </ContainerTable>
          {pageCountFiltered > 1 && (
              <Pagination>
                <ReactPaginate
                  previousLabel={"Anterior"}
                  nextLabel={"Próximo"}
                  pageCount={pageCountFiltered}
                  onPageChange={handlePageClickFiltered}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </Pagination>
            )}
        </>
      )}
    </>
  );
}

export default FileReaderComp;
