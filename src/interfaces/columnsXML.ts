// Interface Columns xls
    // Interface informações de usuário
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

// Interface informações de endereço  
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
  
// Interface informações adicionais
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