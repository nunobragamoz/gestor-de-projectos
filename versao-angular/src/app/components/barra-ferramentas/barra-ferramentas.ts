import { Component } from '@angular/core';
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
}
