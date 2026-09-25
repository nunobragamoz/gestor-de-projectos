import { Service, effect, signal } from '@angular/core';
import { carregarLista, gravarLista } from '../data/armazenamento';
import { tarefasExemplo } from '../data/dados-exemplo';
import { DadosTarefa, Tarefa } from '../models/tarefa';

@Service()
export class TarefaService {
  // O signal é privado: os componentes só leem a lista, e todas as alterações
  // passam pelo serviço.
  private readonly lista = signal<Tarefa[]>(carregarLista('tarefas', tarefasExemplo));

  readonly tarefas = this.lista.asReadonly();

  constructor() {
    // Corre logo no início (grava os dados de exemplo na primeira utilização)
    // e de novo sempre que a lista muda, como o useEffect da versão React.
    effect(() => gravarLista('tarefas', this.lista()));
  }

  adicionar(dados: DadosTarefa): void {
    const tarefa: Tarefa = {
      id: crypto.randomUUID(),
      criadaEm: new Date().toISOString(),
      ...dados,
    };

    // Um array novo, em vez de push(): o signal só avisa quando recebe
    // um valor diferente.
    this.lista.update((tarefas) => [...tarefas, tarefa]);
  }
}
