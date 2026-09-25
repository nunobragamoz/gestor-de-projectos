import { Component, EnvironmentInjector, afterNextRender, inject, input, output } from '@angular/core';
import { ESTADOS, PRIORIDADES } from '../../data/opcoes';
import { Projeto } from '../../models/projeto';
import { Estado, Tarefa } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa-service';

@Component({
  selector: 'app-cartao-tarefa',
  templateUrl: './cartao-tarefa.html',
  styleUrl: './cartao-tarefa.css',
})
export class CartaoTarefa {
  tarefa = input.required<Tarefa>();
  projeto = input<Projeto>();

  // Editar abre o formulário, que está no Painel, por isso o cartão só avisa.
  readonly editar = output<Tarefa>();

  private readonly tarefaService = inject(TarefaService);
  private readonly injector = inject(EnvironmentInjector);

  protected readonly estados = ESTADOS;
  protected readonly prioridades = PRIORIDADES;

  protected mudarEstado(estado: string): void {
    const id = this.tarefa().id;

    this.tarefaService.mudarEstado(id, estado as Estado);

    // O cartão passa para outra coluna: este é destruído e é criado um novo.
    // Depois de o ecrã ser atualizado, o foco vai para o select do cartão
    // novo, para quem usa o teclado não perder o sítio.
    afterNextRender(
      () => document.querySelector<HTMLElement>(`.tarefa[data-id="${id}"] .tarefa-estado`)?.focus(),
      { injector: this.injector },
    );
  }

  protected apagar(): void {
    const tarefa = this.tarefa();

    if (confirm(`Apagar a tarefa "${tarefa.titulo}"?`)) {
      this.tarefaService.apagar(tarefa.id);
    }
  }
}
