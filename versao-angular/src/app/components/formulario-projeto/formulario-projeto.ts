import { Component } from '@angular/core';
import { CORES_PROJETO } from '../../data/opcoes';

@Component({
  imports: [],
  selector: 'app-formulario-projeto',
  styleUrl: './formulario-projeto.css',
  templateUrl: './formulario-projeto.html',
})
export class FormularioProjeto {
  protected readonly cores = CORES_PROJETO;
}
