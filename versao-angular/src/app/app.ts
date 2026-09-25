import { Component } from '@angular/core';
import { BarraFerramentas } from './components/barra-ferramentas/barra-ferramentas';
import { FormularioTarefa } from './components/formulario-tarefa/formulario-tarefa';
import { Quadro } from './components/quadro/quadro';
import { projetosMock, tarefasMock } from './data/mock-data';

@Component({
  selector: 'app-root',
  imports: [BarraFerramentas, FormularioTarefa, Quadro],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly tarefas = tarefasMock;
  protected readonly projetos = projetosMock;
}
