export interface Iuser {
    Nome: string;
    NomeSocial?: string;
    Cpf: string;
    Genero: string;
    Nascimento: string;
    Nacionalidade: string;
    DDD: string;
    Telefone: string;
    Email: string;
}
  
export interface Iaddress extends Iuser {
    Mae: string;
    Cidade: string;
    Bairro: string;
    Endereco: string;
    Numero: string;
    Complemento: string;
    Cep: string;
    Ocupacao: string;
}
  
export interface Iaddinf extends Iaddress {
    Interesse: string;
    Publica: string;
    Escolaridade: string;
    Renda: string;
    Deficiencia: string;
    Filhos: string;
    CodJuv: string;
    Raca: string;
    Matricula: string;
    Status: string;
}