import { Component, input } from '@angular/core';
import { ESTADOS, PRIORIDADES } from '../../data/opcoes';
import { Projeto } from '../../models/projeto';
import { Tarefa } from '../../models/tarefa';

@Component({
  selector: 'app-cartao-tarefa',
  templateUrl: './cartao-tarefa.html',
  styleUrl: './cartao-tarefa.css',
})
export class CartaoTarefa {
  tarefa = input.required<Tarefa>();
  projeto = input<Projeto>();

  protected readonly estados = ESTADOS;
  protected readonly prioridades = PRIORIDADES;
}
