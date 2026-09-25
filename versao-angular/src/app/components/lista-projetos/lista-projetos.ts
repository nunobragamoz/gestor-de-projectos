import { Component, input } from '@angular/core';
import { Projeto } from '../../models/projeto';
import { Tarefa } from '../../models/tarefa';

@Component({
  imports: [],
  selector: 'app-lista-projetos',
  styleUrl: './lista-projetos.css',
  templateUrl: './lista-projetos.html',
})
export class ListaProjetos {
  projetos = input.required<Projeto[]>();
  tarefas = input.required<Tarefa[]>();
  projetoSelecionadoId = input.required<string>();

  protected contarTarefas(projetoId: string): number {
    return this.tarefas().filter((tarefa) => tarefa.projetoId === projetoId).length;
  }
}
