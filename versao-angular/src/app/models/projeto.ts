export interface Projeto {
  id: string;
  nome: string;
  cliente: string;
  cor: string;
  criadoEm: string;
}

// O que o formulário preenche: o id e a data são gerados pelo ProjetoService.
export type DadosProjeto = Omit<Projeto, 'id' | 'criadoEm'>;
