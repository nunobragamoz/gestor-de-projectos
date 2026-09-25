import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Projeto } from '../../models/projeto';
import { Tarefa } from '../../models/tarefa';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-lista-projetos',
  styleUrl: './lista-projetos.css',
  templateUrl: './lista-projetos.html',
})
export class ListaProjetos {
  projetos = input.required<Projeto[]>();
  tarefas = input.required<Tarefa[]>();

  readonly novoProjeto = output<void>();

  protected contarTarefas(projetoId: string): number {
    return this.tarefas().filter((tarefa) => tarefa.projetoId === projetoId).length;
  }
}
