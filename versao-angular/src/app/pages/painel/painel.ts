import { Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { BarraFerramentas } from '../../components/barra-ferramentas/barra-ferramentas';
import { FormularioProjeto } from '../../components/formulario-projeto/formulario-projeto';
import { FormularioTarefa } from '../../components/formulario-tarefa/formulario-tarefa';
import { ListaProjetos } from '../../components/lista-projetos/lista-projetos';
import { ProjetoAtual } from '../../components/projeto-atual/projeto-atual';
import { Quadro } from '../../components/quadro/quadro';
import { Prioridade, Tarefa } from '../../models/tarefa';
import { ProjetoService } from '../../services/projeto-service';
import { TarefaService } from '../../services/tarefa-service';
import { normalizar } from '../../utils/normalizar';

// A página das rotas /projetos e /projetos/:id.
@Component({
  imports: [
    BarraFerramentas,
    FormularioProjeto,
    FormularioTarefa,
    ListaProjetos,
    ProjetoAtual,
    Quadro,
  ],
  selector: 'app-painel',
  styleUrl: './painel.css',
  templateUrl: './painel.html',
})
export class Painel {
  // O :id da rota chega aqui como input (withComponentInputBinding no
  // app.config.ts). Em /projetos fica undefined.
  readonly id = input<string>();

  // Os dados vêm dos serviços: quando mudam, o Angular atualiza o ecrã.
  protected readonly projetos = inject(ProjetoService).projetos;
  protected readonly tarefas = inject(TarefaService).tarefas;

  // undefined quando está selecionado "Todos os projetos".
  protected readonly projetoSelecionado = computed(() =>
    this.projetos().find((projeto) => projeto.id === this.id()),
  );

  // Só se guarda o texto da pesquisa e o filtro. Como o Painel é reutilizado
  // entre rotas (reutilizar-painel.ts), mantêm-se ao mudar de projeto.
  protected readonly pesquisa = signal('');
  protected readonly prioridade = signal<Prioridade | 'todas'>('todas');

  private readonly termo = computed(() => normalizar(this.pesquisa().trim()));

  protected readonly filtroAtivo = computed(
    () => this.termo() !== '' || this.prioridade() !== 'todas',
  );

  // A lista visível é calculada a partir do projeto da rota, da pesquisa e
  // da prioridade, em vez de guardar um segundo array que podia ficar
  // desatualizado. O computed só volta a calcular quando um destes muda.
  protected readonly tarefasVisiveis = computed(() => {
    const projeto = this.projetoSelecionado();
    const termo = this.termo();
    const prioridade = this.prioridade();

    return this.tarefas().filter((tarefa) => {
      const doProjeto = !projeto || tarefa.projetoId === projeto.id;
      const daPrioridade = prioridade === 'todas' || tarefa.prioridade === prioridade;
      const encontrada = normalizar(`${tarefa.titulo} ${tarefa.descricao}`).includes(termo);

      return doProjeto && daPrioridade && encontrada;
    });
  });

  private readonly formularioTarefa = viewChild.required(FormularioTarefa);
  private readonly formularioProjeto = viewChild.required(FormularioProjeto);

  protected novoProjeto(): void {
    this.formularioProjeto().abrir();
  }

  protected editarProjeto(): void {
    this.formularioProjeto().abrir(this.projetoSelecionado());
  }

  protected novaTarefa(): void {
    const projetos = this.projetos();

    // Cada tarefa pertence a um projeto, por isso sem projetos não há tarefas.
    if (projetos.length === 0) {
      alert('Para criar uma tarefa, crie primeiro um projeto.');
      this.formularioProjeto().abrir();
      return;
    }

    // Em "Todos os projetos" o formulário pré-seleciona o primeiro projeto.
    this.formularioTarefa().abrir(this.projetoSelecionado()?.id ?? projetos[0].id);
  }

  protected editarTarefa(tarefa: Tarefa): void {
    this.formularioTarefa().abrir(tarefa.projetoId, tarefa);
  }
}
