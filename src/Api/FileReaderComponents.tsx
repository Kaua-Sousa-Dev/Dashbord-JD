import { useState } from "react";
import * as XLSX from "xlsx";
import { Iaddinf } from "../interfaces/columnsXML";
import exemplo_De_Planilha from "../../public/Exemplo_De_Planilha-png.png";
import ReactPaginate from "react-paginate";

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            const filtersArray = value.split(/,|\s/)
            const userKey = (user[key as keyof Iaddinf])
            const firstMatch = filtersArray.find((filter) => {
              return userKey?.toString()?.toLowerCase()?.includes(
                filter?.toString()?.toLowerCase()
              )
            })
            return firstMatch != null
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
      <div className="container">
        <div className="centerContainer">
          <h1 className="title">Tradutor de Dados: </h1>
          <p>Escolha um arquivo .xls ou .xlsx</p>
          <p>
            Atenção: baseie seu arquivo com a imagem abaixo!, <br /> atentando-se ao uso
            de caracteres especiais
          </p>

          <form>
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
          
          <img
            src={exemplo_De_Planilha}
            alt="Exemplo de Planilha"
            className="ex_pl"
          />
        </div>
      </div>

      {
        data.length > 0 && (
          <div className="container_data">
            <h3 className="centerContainer">Dados da Planilha:</h3>
            <div className="table-container">
              <table className="list_princ">
                <thead>
                  <tr>
                    <th>Nome & Nome Social</th>
                    <th>CPF</th>
                    <th>Gênero</th>
                    <th>Nascimento</th>
                    <th>Nacionalidade</th>
                    <th>DDD & Telefone</th>
                    <th>Email</th>
                    <th>Nome da Mãe</th>
                    <th>Informações de endereço</th>
                    <th>Ocupação</th>
                    <th>Interesse</th>
                    <th>Escolaridade</th>
                    <th>Escola Pública</th>
                    <th>Renda</th>
                    <th>Deficiência</th>
                    <th>Filhos</th>
                    <th>Código Juventude Digital</th>
                    <th>Raça</th>
                    <th>Matrícula & Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDataOriginal.map((user, index) => (
                    <tr key={index} className="princ_user">
                      <td>
                        {user.Nome} - {user.NomeSocial}
                      </td>
                      <td>{user.Cpf}</td>
                      <td>{user.Genero}</td>
                      <td>{user.Nascimento}</td>
                      <td>{user.Nacionalidade}</td>
                      <td>
                        {user.DDD} - {user.Telefone}
                      </td>
                      <td>{user.Email}</td>
                      <td>{user.Mae}</td>
                      <td>
                        {user.Cidade} - {user.Bairro} - {user.Endereco} -{" "}
                        {user.Numero} - {user.Complemento} - {user.Cep}
                      </td>
                      <td>{user.Ocupacao}</td>
                      <td>{user.Interesse.replaceAll(",", ", ")}</td>
                      <td>{user.Escolaridade}</td>
                      <td>{user.Publica}</td>
                      <td>{user.Renda}</td>
                      <td>{user.Deficiencia}</td>
                      <td>{user.Filhos}</td>
                      <td>{user.CodJuv}</td>
                      <td>{user.Raca}</td>
                      <td>
                        {user.Matricula} - {user.Status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ReactPaginate
              previousLabel={"Anterior"}
              nextLabel={"Próximo"}
              pageCount={pageCountOriginal}
              onPageChange={handlePageClickOriginal}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        )
      }

      {
        data.length > 0 && (
          <div className="contentContainer">
            <h3>Filtragem:</h3>
            <div className="userDad">
              {Object.keys(filterCriteria).map((key) => (
                <div key={key} className="filter-item">
                  <label>{key}: </label>
                  {
                    ["Renda", "Deficiencia", "Genero", "Escolaridade", "Publica", "Filhos", "Status"].includes(key)
                      ? (
                        <select 
                          name={key}
                          onChange={handleFilterChange}
                        >
                          {Array.from(new Set(data.map((user) => user[key as keyof Iaddinf]).sort())).map(option => (
                            <option 
                              key={option} 
                              value={option} 
                              selected={filterCriteria[key as keyof typeof filterCriteria] == option}
                            >{option}</option>
                          ))}
                        </select>
                      )
                      : (
                        <input
                          type="text"
                          name={key}
                          value={filterCriteria[key as keyof typeof filterCriteria] || ""}
                          onChange={handleFilterChange}
                        />
                      )
                  }
                </div>
              ))}
            </div>
            <button onClick={applyFilter}>Aplicar Filtro</button>
          </div>
        )
      }

      {isFiltered && (
        <div className="container_data">
          <h3 className="centerContainer">Dados Filtrados:</h3>
          <div className="table-container">
            <table className="list_princ">
              <thead>
                <tr>
                  <th>Nome & Nome Social</th>
                  {filterCriteria.Cpf && <th>CPF</th>}
                  {filterCriteria.Genero && <th>Gênero</th>}
                  {filterCriteria.Nascimento && <th>Nascimento</th>}
                  {filterCriteria.Nacionalidade && <th>Nacionalidade</th>}
                  {filterCriteria.DDD && <th>DDD & Telefone</th>}
                  {filterCriteria.Email && <th>Email</th>}
                  {filterCriteria.Mae && <th>Nome da Mãe</th>}
                  {(filterCriteria.Cidade ||
                    filterCriteria.Bairro ||
                    filterCriteria.Endereco ||
                    filterCriteria.Numero ||
                    filterCriteria.Complemento ||
                    filterCriteria.Cep) && <th>Informações de endereço</th>}
                  {filterCriteria.Ocupacao && <th>Ocupação</th>}
                  {filterCriteria.Interesse && <th>Interesse</th>}
                  {filterCriteria.Escolaridade && (<th>Escolaridade</th>)}
                  {filterCriteria.Publica && (<th>Escola pública?</th>)}
                  {filterCriteria.Renda && <th>Renda</th>}
                  {filterCriteria.Deficiencia && <th>Deficiência</th>}
                  {filterCriteria.Filhos && <th>Filhos</th>}
                  {filterCriteria.CodJuv && <th>Código Juventude Digital</th>}
                  {filterCriteria.Raca && <th>Raça</th>}
                  {filterCriteria.Status && <th>Matrícula & Status</th>}
                </tr>
              </thead>
              <tbody>
                {currentDataFiltered.map((user, index) => (
                  <tr key={index} className="princ_user">
                    <td>
                      {user.Nome} - {user.NomeSocial}
                    </td>
                    {filterCriteria.Cpf && <td>{user.Cpf}</td>}
                    {filterCriteria.Genero && <td>{user.Genero}</td>}
                    {filterCriteria.Nascimento && <td>{user.Nascimento}</td>}
                    {filterCriteria.Nacionalidade && (
                      <td>{user.Nacionalidade}</td>
                    )}
                    {filterCriteria.DDD && <td>{user.DDD}</td>}
                    {filterCriteria.Email && <td>{user.Email}</td>}
                    {filterCriteria.Mae && <td>{user.Mae}</td>}
                    {(filterCriteria.Cidade ||
                      filterCriteria.Bairro ||
                      filterCriteria.Endereco ||
                      filterCriteria.Numero ||
                      filterCriteria.Complemento ||
                      filterCriteria.Cep) && (
                      <td>
                        {user.Endereco}, {user.Numero}, {user.Complemento},{" "}
                        {user.Bairro}, {user.Cidade} - {user.Cep}
                      </td>
                    )}
                    {filterCriteria.Ocupacao && <td>{user.Ocupacao}</td>}
                    {filterCriteria.Interesse && <td>{user.Interesse.replaceAll(",", ", ")}</td>}
                    {filterCriteria.Escolaridade && <td>{user.Escolaridade}</td>}
                    {filterCriteria.Publica && <td>{user.Publica}</td>}
                    {filterCriteria.Renda && <td>{user.Renda}</td>}
                    {filterCriteria.Deficiencia && <td>{user.Deficiencia}</td>}
                    {filterCriteria.Filhos && <td>{user.Filhos}</td>}
                    {filterCriteria.CodJuv && <td>{user.CodJuv}</td>}
                    {filterCriteria.Raca && <td>{user.Raca}</td>}
                    {filterCriteria.Status && (
                      <td>
                        {user.Matricula} - {user.Status}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {pageCountFiltered > 1 && (
              <div className="pagination-container">
                <ReactPaginate
                  previousLabel={"Anterior"}
                  nextLabel={"Próximo"}
                  pageCount={pageCountFiltered}
                  onPageChange={handlePageClickFiltered}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FileReaderComp;
