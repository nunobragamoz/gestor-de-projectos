import { Component, model, output } from '@angular/core';
import { PRIORIDADES } from '../../data/opcoes';
import { Prioridade } from '../../models/tarefa';

@Component({
  imports: [],
  selector: 'app-barra-ferramentas',
  styleUrl: './barra-ferramentas.css',
  templateUrl: './barra-ferramentas.html',
})
export class BarraFerramentas {
  protected readonly prioridades = PRIORIDADES;
  protected readonly ordem: Prioridade[] = ['alta', 'media', 'baixa'];

  // model() é um input que o componente também pode alterar: o Painel liga-os
  // com [(pesquisa)] e [(prioridade)] e recebe cada mudança.
  readonly pesquisa = model('');
  readonly prioridade = model<Prioridade | 'todas'>('todas');

  readonly novaTarefa = output<void>();
}
