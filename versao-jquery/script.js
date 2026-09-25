$(function () {

  /* Opções */

  const ESTADOS = [
    { valor: 'por-fazer', rotulo: 'Por Fazer', titulo: 'Por Fazer' },
    { valor: 'em-progresso', rotulo: 'Em Progresso', titulo: 'Em Progresso' },
    { valor: 'concluida', rotulo: 'Concluída', titulo: 'Concluídas' },
  ];

  const PRIORIDADES = {
    baixa: 'Baixa',
    media: 'Média',
    alta: 'Alta',
  };

  /* Dados de exemplo, usados na primeira utilização */

  const DADOS_EXEMPLO = {
    projetos: [
      { id: 'p1', nome: 'Site da Padaria', cliente: 'Padaria Sol', cor: '#8b5cf6', criadoEm: '2026-09-01T09:00:00.000Z' },
      { id: 'p2', nome: 'Loja Online Moda', cliente: 'Moda Lx', cor: '#ec4899', criadoEm: '2026-09-05T09:00:00.000Z' },
      { id: 'p3', nome: 'Portfólio pessoal', cliente: '', cor: '#0ea5e9', criadoEm: '2026-09-10T09:00:00.000Z' },
    ],
    tarefas: [
      {
        id: '1',
        titulo: 'Enviar orçamento ao cliente',
        descricao: 'Orçamento do site da padaria, com hosting incluído.',
        prioridade: 'alta',
        estado: 'por-fazer',
        projetoId: 'p1',
        criadaEm: '2026-09-12T10:00:00.000Z',
      },
      {
        id: '2',
        titulo: 'Atualizar portfólio',
        descricao: 'Adicionar os dois projetos mais recentes.',
        prioridade: 'baixa',
        estado: 'por-fazer',
        projetoId: 'p3',
        criadaEm: '2026-09-13T10:00:00.000Z',
      },
      {
        id: '3',
        titulo: 'Design da página inicial',
        descricao: 'Maquete em Figma para aprovação do cliente.',
        prioridade: 'media',
        estado: 'em-progresso',
        projetoId: 'p1',
        criadaEm: '2026-09-14T10:00:00.000Z',
      },
      {
        id: '4',
        titulo: 'Emitir fatura de setembro',
        descricao: 'Fatura no Portal das Finanças para o cliente da loja online.',
        prioridade: 'alta',
        estado: 'em-progresso',
        projetoId: 'p2',
        criadaEm: '2026-09-15T10:00:00.000Z',
      },
      {
        id: '5',
        titulo: 'Reunião de kickoff',
        descricao: 'Definir prazos e entregas com o novo cliente.',
        prioridade: 'media',
        estado: 'concluida',
        projetoId: 'p2',
        criadaEm: '2026-09-16T10:00:00.000Z',
      },
    ],
  };

  /* Estado da aplicação */

  let projetos = [];
  let tarefas = [];
  let projetoSelecionadoId = 'todos';

  /* localStorage */

  function ler(chave) {
    try {
      const dados = JSON.parse(localStorage.getItem(chave));
      return Array.isArray(dados) ? dados : [];
    } catch (erro) {
      return [];
    }
  }

  function gravar() {
    localStorage.setItem('projetos', JSON.stringify(projetos));
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  /* Auxiliares */

  function contar(total, singular, plural) {
    return total + ' ' + (total === 1 ? singular : plural);
  }

  function procurarProjeto(id) {
    return projetos.find(function (projeto) {
      return projeto.id === id;
    });
  }

  function tarefasDoProjeto(projetoId) {
    return tarefas.filter(function (tarefa) {
      return tarefa.projetoId === projetoId;
    });
  }

  function tarefasVisiveis() {
    if (projetoSelecionadoId === 'todos') {
      return tarefas;
    }

    return tarefasDoProjeto(projetoSelecionadoId);
  }

  function criarOpcoesEstado() {
    return ESTADOS.map(function (estado) {
      return $('<option>', { value: estado.valor, text: estado.rotulo });
    });
  }

  /* Render */

  function criarItemProjeto(id, nome, cor, total) {
    const ativo = id === projetoSelecionadoId;

    const $botao = $('<button>', {
      type: 'button',
      class: 'projeto-item',
      'data-projeto': id,
    })
      .toggleClass('ativo', ativo)
      .attr('aria-current', ativo ? 'true' : null)
      .css('--cor-projeto', cor)
      .append(
        $('<span>', { class: 'projeto-cor' }),
        $('<span>', { class: 'projeto-nome', text: nome }),
        $('<span>', { class: 'projeto-contador', text: total })
      );

    return $('<li>').append($botao);
  }

  function renderProjetos() {
    const $lista = $('#projetos-lista').empty();

    $lista.append(
      criarItemProjeto('todos', 'Todos os projetos', 'var(--text-muted)', tarefas.length)
    );

    projetos.forEach(function (projeto) {
      $lista.append(
        criarItemProjeto(projeto.id, projeto.nome, projeto.cor, tarefasDoProjeto(projeto.id).length)
      );
    });
  }

  function renderProjetoAtual() {
    $('#projeto-atual-nome').text('Todas as tarefas');
    $('#projeto-atual-cliente').text(
      contar(tarefas.length, 'tarefa', 'tarefas') + ' em ' +
      contar(projetos.length, 'projeto', 'projetos')
    );
  }

  function criarCartao(tarefa) {
    const projeto = procurarProjeto(tarefa.projetoId);

    const $cartao = $('<article>', { class: 'tarefa', 'data-id': tarefa.id });

    $cartao.append(
      $('<header>', { class: 'tarefa-topo' }).append(
        $('<h3>', { class: 'tarefa-titulo', text: tarefa.titulo }),
        $('<span>', {
          class: 'badge prioridade-' + tarefa.prioridade,
          text: PRIORIDADES[tarefa.prioridade],
        })
      )
    );

    if (projeto) {
      $cartao.append(
        $('<span>', { class: 'tarefa-projeto', text: projeto.nome })
          .css('--cor-projeto', projeto.cor)
      );
    }

    if (tarefa.descricao) {
      $cartao.append($('<p>', { class: 'tarefa-descricao', text: tarefa.descricao }));
    }

    const $estado = $('<select>', {
      class: 'tarefa-estado',
      'aria-label': 'Estado da tarefa',
    })
      .append(criarOpcoesEstado())
      .val(tarefa.estado);

    $cartao.append(
      $('<footer>', { class: 'tarefa-acoes' }).append(
        $estado,
        $('<button>', { type: 'button', class: 'btn btn-editar', text: 'Editar' }),
        $('<button>', { type: 'button', class: 'btn btn-apagar', text: 'Apagar' })
      )
    );

    return $cartao;
  }

  function renderTarefas() {
    const visiveis = tarefasVisiveis();

    ESTADOS.forEach(function (estado) {
      const $coluna = $('.coluna[data-estado="' + estado.valor + '"]');
      const $lista = $coluna.find('.coluna-lista').empty();

      const daColuna = visiveis.filter(function (tarefa) {
        return tarefa.estado === estado.valor;
      });

      $coluna.find('.contador').text(daColuna.length);

      if (daColuna.length === 0) {
        $lista.append($('<p>', { class: 'coluna-vazia', text: 'Sem tarefas' }));
        return;
      }

      daColuna.forEach(function (tarefa) {
        $lista.append(criarCartao(tarefa));
      });
    });
  }

  function renderOpcoesProjeto() {
    const $select = $('#tarefa-projeto-input').empty();

    projetos.forEach(function (projeto) {
      $select.append($('<option>', { value: projeto.id, text: projeto.nome }));
    });
  }

  function render() {
    renderProjetos();
    renderProjetoAtual();
    renderTarefas();
    renderOpcoesProjeto();
  }

  /* Arranque */

  // Só usa os dados de exemplo se a chave nunca foi gravada. Se o utilizador
  // apagar todos os projetos, a lista vazia fica guardada e não volta a
  // aparecer o exemplo ao recarregar.
  if (localStorage.getItem('projetos') === null) {
    projetos = JSON.parse(JSON.stringify(DADOS_EXEMPLO.projetos));
    tarefas = JSON.parse(JSON.stringify(DADOS_EXEMPLO.tarefas));
    gravar();
  } else {
    projetos = ler('projetos');
    tarefas = ler('tarefas');
  }

  $('#tarefa-estado-input').append(criarOpcoesEstado());

  render();

});
