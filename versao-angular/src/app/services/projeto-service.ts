import { Service, effect, signal } from '@angular/core';
import { carregarLista, gravarLista } from '../data/armazenamento';
import { projetosExemplo } from '../data/dados-exemplo';
import { Projeto } from '../models/projeto';

@Service()
export class ProjetoService {
  // O signal é privado: os componentes só leem a lista, e todas as alterações
  // passam pelo serviço (criar, editar e apagar chegam no passo 20).
  private readonly lista = signal<Projeto[]>(carregarLista('projetos', projetosExemplo));

  readonly projetos = this.lista.asReadonly();

  constructor() {
    // Corre logo no início (grava os dados de exemplo na primeira utilização)
    // e de novo sempre que a lista muda, como o useEffect da versão React.
    effect(() => gravarLista('projetos', this.lista()));
  }
}
