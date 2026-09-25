import { Component, computed, input, output } from '@angular/core';
import { Projeto } from '../../models/projeto';
import { Tarefa } from '../../models/tarefa';

function contar(total: number, singular: string, plural: string): string {
  return `${total} ${total === 1 ? singular : plural}`;
}

@Component({
  imports: [],
  selector: 'app-projeto-atual',
  styleUrl: './projeto-atual.css',
  templateUrl: './projeto-atual.html',
})
export class ProjetoAtual {
  projeto = input<Projeto>();
  tarefas = input.required<Tarefa[]>();
  projetos = input.required<Projeto[]>();

  readonly editar = output<void>();

  protected readonly nome = computed(() => this.projeto()?.nome ?? 'Todas as tarefas');

  protected readonly resumo = computed(() => {
    const projeto = this.projeto();

    if (!projeto) {
      return `${contar(this.tarefas().length, 'tarefa', 'tarefas')} em ${contar(
        this.projetos().length,
        'projeto',
        'projetos',
      )}`;
    }

    const totalProjeto = this.tarefas().filter(
      (tarefa) => tarefa.projetoId === projeto.id,
    ).length;

    return [projeto.cliente, contar(totalProjeto, 'tarefa', 'tarefas')]
      .filter(Boolean)
      .join(' · ');
  });
}
