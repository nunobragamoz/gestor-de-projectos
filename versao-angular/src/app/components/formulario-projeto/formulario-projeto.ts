import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CORES_PROJETO } from '../../data/opcoes';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto-service';
import { TarefaService } from '../../services/tarefa-service';
import { obrigatorio } from '../../utils/validadores';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-formulario-projeto',
  styleUrl: './formulario-projeto.css',
  templateUrl: './formulario-projeto.html',
})
export class FormularioProjeto {
  private readonly projetoService = inject(ProjetoService);
  private readonly tarefaService = inject(TarefaService);
  private readonly router = inject(Router);

  private readonly dialogo = viewChild.required<ElementRef<HTMLDialogElement>>('dialogo');
  private readonly campoNome = viewChild.required<ElementRef<HTMLInputElement>>('campoNome');

  protected readonly cores = CORES_PROJETO;

  protected readonly form = new FormGroup({
    nome: new FormControl('', {
      nonNullable: true,
      validators: [obrigatorio, Validators.maxLength(60)],
    }),
    cliente: new FormControl('', {
      nonNullable: true,
      validators: Validators.maxLength(60),
    }),
    // Nos radios usa-se [formControl] e não formControlName, porque o Angular
    // exige que formControlName seja igual ao name ("projeto-cor").
    cor: new FormControl(CORES_PROJETO[0].valor, { nonNullable: true }),
  });

  // null ao criar; o projeto que se está a editar ao editar.
  protected readonly emEdicao = signal<Projeto | null>(null);

  // O erro só aparece depois de tentar guardar, e some ao escrever.
  protected readonly erro = signal(false);

  // Chamado pelo Painel. Cada abertura começa com o formulário limpo.
  abrir(projeto: Projeto | null = null): void {
    this.emEdicao.set(projeto);
    this.form.reset({
      nome: projeto?.nome ?? '',
      cliente: projeto?.cliente ?? '',
      cor: projeto?.cor ?? CORES_PROJETO[0].valor,
    });
    this.erro.set(false);
    this.dialogo().nativeElement.showModal();
  }

  protected guardar(evento: Event): void {
    // Com method="dialog" o browser fechava o dialog mesmo com erros.
    evento.preventDefault();

    if (this.form.invalid) {
      this.erro.set(true);
      this.campoNome().nativeElement.focus();
      return;
    }

    const { nome, cliente, cor } = this.form.getRawValue();
    const dados = { nome: nome.trim(), cliente: cliente.trim(), cor };
    const projeto = this.emEdicao();

    if (projeto) {
      this.projetoService.atualizar(projeto.id, dados);
    } else {
      // O projeto novo fica selecionado: a rota dele é /projetos/:id.
      const novo = this.projetoService.adicionar(dados);
      this.router.navigate(['/projetos', novo.id]);
    }

    this.fechar();
  }

  protected apagar(): void {
    const projeto = this.emEdicao();

    if (!projeto) {
      return;
    }

    const total = this.tarefaService
      .tarefas()
      .filter((tarefa) => tarefa.projetoId === projeto.id).length;

    let mensagem = `Apagar o projeto "${projeto.nome}"?`;

    if (total === 1) {
      mensagem += '\n\nA tarefa deste projeto também vai ser apagada.';
    } else if (total > 1) {
      mensagem += `\n\nAs ${total} tarefas deste projeto também vão ser apagadas.`;
    }

    if (!confirm(mensagem)) {
      return;
    }

    this.projetoService.apagar(projeto.id);
    this.fechar();
    this.router.navigate(['/projetos']);
  }

  protected fechar(): void {
    this.dialogo().nativeElement.close();
  }
}
