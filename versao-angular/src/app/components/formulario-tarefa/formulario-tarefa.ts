import { Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ESTADOS, PRIORIDADES } from '../../data/opcoes';
import { Projeto } from '../../models/projeto';
import { Estado, Prioridade } from '../../models/tarefa';
import { TarefaService } from '../../services/tarefa-service';

// Validators.required aceita "   ", por isso o título é validado sem espaços.
function obrigatorio(controlo: AbstractControl<string>): ValidationErrors | null {
  return controlo.value.trim() ? null : { obrigatorio: true };
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-formulario-tarefa',
  styleUrl: './formulario-tarefa.css',
  templateUrl: './formulario-tarefa.html',
})
export class FormularioTarefa {
  projetos = input.required<Projeto[]>();

  private readonly tarefaService = inject(TarefaService);

  // showModal() e focus() são métodos do elemento DOM, por isso é preciso
  // chegar aos elementos com viewChild.
  private readonly dialogo = viewChild.required<ElementRef<HTMLDialogElement>>('dialogo');
  private readonly campoTitulo = viewChild.required<ElementRef<HTMLInputElement>>('campoTitulo');

  protected readonly estados = ESTADOS;
  protected readonly prioridades = PRIORIDADES;
  protected readonly ordem: Prioridade[] = ['baixa', 'media', 'alta'];

  // nonNullable: ao fazer reset, cada campo volta a um texto e não a null.
  protected readonly form = new FormGroup({
    titulo: new FormControl('', {
      nonNullable: true,
      validators: [obrigatorio, Validators.maxLength(80)],
    }),
    descricao: new FormControl('', {
      nonNullable: true,
      validators: Validators.maxLength(500),
    }),
    projetoId: new FormControl('', { nonNullable: true }),
    prioridade: new FormControl<Prioridade>('media', { nonNullable: true }),
    estado: new FormControl<Estado>('por-fazer', { nonNullable: true }),
  });

  // O erro só aparece depois de tentar guardar, e some ao escrever.
  protected readonly erro = signal(false);

  // Chamado pelo App. Cada abertura começa com o formulário limpo.
  abrir(projetoId: string): void {
    this.form.reset({
      titulo: '',
      descricao: '',
      projetoId,
      prioridade: 'media',
      estado: 'por-fazer',
    });
    this.erro.set(false);
    this.dialogo().nativeElement.showModal();
  }

  protected guardar(evento: Event): void {
    // Com method="dialog" o browser fechava o dialog mesmo com erros.
    evento.preventDefault();

    if (this.form.invalid) {
      this.erro.set(true);
      this.campoTitulo().nativeElement.focus();
      return;
    }

    const { titulo, descricao, projetoId, prioridade, estado } = this.form.getRawValue();

    this.tarefaService.adicionar({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      prioridade,
      estado,
      projetoId,
    });

    this.fechar();
  }

  protected fechar(): void {
    this.dialogo().nativeElement.close();
  }
}
