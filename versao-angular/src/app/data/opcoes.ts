import { Estado, Prioridade } from '../models/tarefa';

export const ESTADOS: { valor: Estado; rotulo: string; titulo: string }[] = [
  { valor: 'por-fazer', rotulo: 'Por Fazer', titulo: 'Por Fazer' },
  { valor: 'em-progresso', rotulo: 'Em Progresso', titulo: 'Em Progresso' },
  { valor: 'concluida', rotulo: 'Concluída', titulo: 'Concluídas' },
];

export const PRIORIDADES: Record<Prioridade, string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
};

export const CORES_PROJETO = [
  { valor: '#8b5cf6', nome: 'Violeta' },
  { valor: '#ec4899', nome: 'Rosa' },
  { valor: '#0ea5e9', nome: 'Azul' },
  { valor: '#14b8a6', nome: 'Turquesa' },
  { valor: '#f97316', nome: 'Laranja' },
  { valor: '#84cc16', nome: 'Lima' },
];
