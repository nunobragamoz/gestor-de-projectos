import { Component } from '@angular/core';
import { CartaoTarefa } from './components/cartao-tarefa/cartao-tarefa';
import { projetosMock, tarefasMock } from './data/mock-data';
import { Projeto } from './models/projeto';

@Component({
  selector: 'app-root',
  imports: [CartaoTarefa],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly tarefas = tarefasMock;
  protected readonly projetos = projetosMock;

  protected projetoDe(id: string): Projeto | undefined {
    return this.projetos.find((p) => p.id === id);
  }
}
