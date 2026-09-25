import { Component, computed, inject, viewChild } from '@angular/core';
import { BarraFerramentas } from './components/barra-ferramentas/barra-ferramentas';
import { FormularioProjeto } from './components/formulario-projeto/formulario-projeto';
import { FormularioTarefa } from './components/formulario-tarefa/formulario-tarefa';
import { ListaProjetos } from './components/lista-projetos/lista-projetos';
import { ProjetoAtual } from './components/projeto-atual/projeto-atual';
import { Quadro } from './components/quadro/quadro';
import { ProjetoService } from './services/projeto-service';
import { TarefaService } from './services/tarefa-service';

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
  // Os dados vêm dos serviços: quando mudam, o Angular atualiza o ecrã.
  protected readonly projetos = inject(ProjetoService).projetos;
  protected readonly tarefas = inject(TarefaService).tarefas;

  // Passa a vir da rota /projetos/:id no passo 20.
  protected readonly projetoSelecionadoId = 'todos';

  // undefined quando está selecionado "Todos os projetos".
  protected readonly projetoSelecionado = computed(() =>
    this.projetos().find((projeto) => projeto.id === this.projetoSelecionadoId),
  );

  private readonly formularioTarefa = viewChild.required(FormularioTarefa);

  protected novaTarefa(): void {
    const projetos = this.projetos();

    // Cada tarefa pertence a um projeto, por isso sem projetos não há tarefas.
    if (projetos.length === 0) {
      alert('Para criar uma tarefa, crie primeiro um projeto.');
      return;
    }

    // Em "Todos os projetos" o formulário pré-seleciona o primeiro projeto.
    this.formularioTarefa().abrir(this.projetoSelecionado()?.id ?? projetos[0].id);
  }
}
