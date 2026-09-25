import { Component, input } from '@angular/core';
import { ESTADOS, PRIORIDADES } from '../../data/opcoes';
import { Projeto } from '../../models/projeto';
import { Prioridade } from '../../models/tarefa';

@Component({
  imports: [],
  selector: 'app-formulario-tarefa',
  styleUrl: './formulario-tarefa.css',
  templateUrl: './formulario-tarefa.html',
})
export class FormularioTarefa {
  projetos = input.required<Projeto[]>();

  protected readonly estados = ESTADOS;
  protected readonly prioridades = PRIORIDADES;
  protected readonly ordem: Prioridade[] = ['baixa', 'media', 'alta'];
}
