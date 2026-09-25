import { Component, computed, inject, input, viewChild } from '@angular/core';
import { BarraFerramentas } from '../../components/barra-ferramentas/barra-ferramentas';
import { FormularioProjeto } from '../../components/formulario-projeto/formulario-projeto';
import { FormularioTarefa } from '../../components/formulario-tarefa/formulario-tarefa';
import { ListaProjetos } from '../../components/lista-projetos/lista-projetos';
import { ProjetoAtual } from '../../components/projeto-atual/projeto-atual';
import { Quadro } from '../../components/quadro/quadro';
import { ProjetoService } from '../../services/projeto-service';
import { TarefaService } from '../../services/tarefa-service';

// A página das rotas /projetos e /projetos/:id.
@Component({
  imports: [
    BarraFerramentas,
    FormularioProjeto,
    FormularioTarefa,
    ListaProjetos,
    ProjetoAtual,
    Quadro,
  ],
  selector: 'app-painel',
  styleUrl: './painel.css',
  templateUrl: './painel.html',
})
export class Painel {
  // O :id da rota chega aqui como input (withComponentInputBinding no
  // app.config.ts). Em /projetos fica undefined.
  readonly id = input<string>();

  // Os dados vêm dos serviços: quando mudam, o Angular atualiza o ecrã.
  protected readonly projetos = inject(ProjetoService).projetos;
  protected readonly tarefas = inject(TarefaService).tarefas;

  // undefined quando está selecionado "Todos os projetos".
  protected readonly projetoSelecionado = computed(() =>
    this.projetos().find((projeto) => projeto.id === this.id()),
  );

  // As tarefas do quadro: todas, ou só as do projeto selecionado.
  protected readonly tarefasVisiveis = computed(() => {
    const projeto = this.projetoSelecionado();

    return this.tarefas().filter((tarefa) => !projeto || tarefa.projetoId === projeto.id);
  });

  private readonly formularioTarefa = viewChild.required(FormularioTarefa);
  private readonly formularioProjeto = viewChild.required(FormularioProjeto);

  protected novoProjeto(): void {
    this.formularioProjeto().abrir();
  }

  protected editarProjeto(): void {
    this.formularioProjeto().abrir(this.projetoSelecionado());
  }

  protected novaTarefa(): void {
    const projetos = this.projetos();

    // Cada tarefa pertence a um projeto, por isso sem projetos não há tarefas.
    if (projetos.length === 0) {
      alert('Para criar uma tarefa, crie primeiro um projeto.');
      this.formularioProjeto().abrir();
      return;
    }

    // Em "Todos os projetos" o formulário pré-seleciona o primeiro projeto.
    this.formularioTarefa().abrir(this.projetoSelecionado()?.id ?? projetos[0].id);
  }
}
