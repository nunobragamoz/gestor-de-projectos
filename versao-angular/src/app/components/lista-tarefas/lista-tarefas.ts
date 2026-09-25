import { Component, input, output } from '@angular/core';
import { Projeto } from '../../models/projeto';
import { Estado, Tarefa } from '../../models/tarefa';
import { CartaoTarefa } from '../cartao-tarefa/cartao-tarefa';

@Component({
  imports: [CartaoTarefa],
  selector: 'app-lista-tarefas',
  styleUrl: './lista-tarefas.css',
  templateUrl: './lista-tarefas.html',
})
export class ListaTarefas {
  estado = input.required<Estado>();
  titulo = input.required<string>();
  tarefas = input.required<Tarefa[]>();
  projetos = input.required<Projeto[]>();

  readonly editar = output<Tarefa>();

  protected projetoDe(id: string): Projeto | undefined {
    return this.projetos().find((projeto) => projeto.id === id);
  }
}
