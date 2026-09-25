import { Service, effect, inject, signal } from '@angular/core';
import { carregarLista, gravarLista } from '../data/armazenamento';
import { projetosExemplo } from '../data/dados-exemplo';
import { DadosProjeto, Projeto } from '../models/projeto';
import { TarefaService } from './tarefa-service';

@Service()
export class ProjetoService {
  private readonly tarefaService = inject(TarefaService);

  // O signal é privado: os componentes só leem a lista, e todas as alterações
  // passam pelo serviço.
  private readonly lista = signal<Projeto[]>(carregarLista('projetos', projetosExemplo));

  readonly projetos = this.lista.asReadonly();

  constructor() {
    // Corre logo no início (grava os dados de exemplo na primeira utilização)
    // e de novo sempre que a lista muda, como o useEffect da versão React.
    effect(() => gravarLista('projetos', this.lista()));
  }

  // Devolve o projeto criado, para se poder navegar para a rota dele.
  adicionar(dados: DadosProjeto): Projeto {
    const projeto: Projeto = {
      id: crypto.randomUUID(),
      criadoEm: new Date().toISOString(),
      ...dados,
    };

    this.lista.update((projetos) => [...projetos, projeto]);

    return projeto;
  }

  atualizar(id: string, dados: DadosProjeto): void {
    this.lista.update((projetos) =>
      projetos.map((projeto) => (projeto.id === id ? { ...projeto, ...dados } : projeto)),
    );
  }

  // Cada tarefa pertence a um projeto, por isso as tarefas vão com ele.
  apagar(id: string): void {
    this.lista.update((projetos) => projetos.filter((projeto) => projeto.id !== id));
    this.tarefaService.apagarDoProjeto(id);
  }
}
