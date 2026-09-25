import { Component } from '@angular/core';
import { BarraFerramentas } from './components/barra-ferramentas/barra-ferramentas';
import { FormularioProjeto } from './components/formulario-projeto/formulario-projeto';
import { FormularioTarefa } from './components/formulario-tarefa/formulario-tarefa';
import { ListaProjetos } from './components/lista-projetos/lista-projetos';
import { ProjetoAtual } from './components/projeto-atual/projeto-atual';
import { Quadro } from './components/quadro/quadro';
import { projetosMock, tarefasMock } from './data/mock-data';

@Component({
  selector: 'app-root',
  imports: [
    BarraFerramentas,
    FormularioProjeto,
    FormularioTarefa,
    ListaProjetos,
    ProjetoAtual,
    Quadro,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly tarefas = tarefasMock;
  protected readonly projetos = projetosMock;

  // Passa a vir da rota /projetos/:id no passo 20.
  protected readonly projetoSelecionadoId = 'todos';

  protected readonly projetoSelecionado = this.projetos.find(
    (projeto) => projeto.id === this.projetoSelecionadoId,
  );
}
