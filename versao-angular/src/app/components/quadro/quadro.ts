import { Component, input, output } from '@angular/core';
import { ESTADOS } from '../../data/opcoes';
import { Projeto } from '../../models/projeto';
import { Estado, Tarefa } from '../../models/tarefa';
import { ListaTarefas } from '../lista-tarefas/lista-tarefas';

@Component({
  imports: [ListaTarefas],
  selector: 'app-quadro',
  styleUrl: './quadro.css',
  templateUrl: './quadro.html',
})
export class Quadro {
  tarefas = input.required<Tarefa[]>();
  projetos = input.required<Projeto[]>();

  readonly editar = output<Tarefa>();

  protected readonly estados = ESTADOS;

  protected tarefasDe(estado: Estado): Tarefa[] {
    return this.tarefas().filter((tarefa) => tarefa.estado === estado);
  }
}
