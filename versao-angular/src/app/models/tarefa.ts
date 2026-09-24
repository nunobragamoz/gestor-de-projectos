export type Prioridade = 'baixa' | 'media' | 'alta';

export type Estado = 'por-fazer' | 'em-progresso' | 'concluida';

export interface Tarefa {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: Prioridade;
  estado: Estado;
  projetoId: string;
  criadaEm: string;
}
