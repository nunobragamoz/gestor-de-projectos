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

  // NFD separa cada letra do seu acento ("ç" passa a "c" + cedilha) e o
  // replace remove os acentos, por isso "orcamento" encontra "Orçamento".
  function normalizar(texto) {
    return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  function filtroAtivo() {
    return $('#pesquisa').val().trim() !== '' || $('#filtro-prioridade').val() !== 'todas';
  }

  // Projeto selecionado + pesquisa + prioridade, tudo combinado.
  function tarefasVisiveis() {
    const pesquisa = normalizar($('#pesquisa').val().trim());
    const prioridade = $('#filtro-prioridade').val();

    return tarefas.filter(function (tarefa) {
      const doProjeto = projetoSelecionadoId === 'todos' || tarefa.projetoId === projetoSelecionadoId;
      const daPrioridade = prioridade === 'todas' || tarefa.prioridade === prioridade;
      const encontrada = normalizar(tarefa.titulo + ' ' + tarefa.descricao).includes(pesquisa);

      return doProjeto && daPrioridade && encontrada;
    });
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
    const projeto = procurarProjeto(projetoSelecionadoId);

    if (!projeto) {
      $('#projeto-atual-nome').text('Todas as tarefas');
      $('#projeto-atual-cliente').text(
        contar(tarefas.length, 'tarefa', 'tarefas') + ' em ' +
        contar(projetos.length, 'projeto', 'projetos')
      );
      $('#btn-editar-projeto').prop('hidden', true);
      return;
    }

    const total = contar(tarefasDoProjeto(projeto.id).length, 'tarefa', 'tarefas');

    $('#projeto-atual-nome').text(projeto.nome);
    $('#projeto-atual-cliente').text(projeto.cliente ? projeto.cliente + ' · ' + total : total);
    $('#btn-editar-projeto').prop('hidden', false);
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
        $lista.append($('<p>', {
          class: 'coluna-vazia',
          text: filtroAtivo() ? 'Sem resultados' : 'Sem tarefas',
        }));
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
    // Se o projeto selecionado deixou de existir, volta a "Todos os projetos".
    if (projetoSelecionadoId !== 'todos' && !procurarProjeto(projetoSelecionadoId)) {
      projetoSelecionadoId = 'todos';
    }

    renderProjetos();
    renderProjetoAtual();
    renderTarefas();
    renderOpcoesProjeto();
  }

  /* Projetos */

  // Event delegation: os itens são recriados em cada render, por isso o
  // evento fica na lista, que existe sempre.
  $('#projetos-lista').on('click', '.projeto-item', function () {
    projetoSelecionadoId = $(this).attr('data-projeto');
    render();
  });

  function mostrarErroNome(mostrar) {
    $('#erro-projeto-nome').prop('hidden', !mostrar);
    $('#projeto-nome-input').attr('aria-invalid', mostrar ? 'true' : null);
  }

  function abrirFormularioProjeto(projeto) {
    const cor = projeto ? projeto.cor : $('input[name="projeto-cor"]').first().val();

    $('#modal-projeto-titulo').text(projeto ? 'Editar projeto' : 'Novo projeto');
    $('#projeto-id').val(projeto ? projeto.id : '');
    $('#projeto-nome-input').val(projeto ? projeto.nome : '');
    $('#projeto-cliente-input').val(projeto ? projeto.cliente : '');
    $('input[name="projeto-cor"]').filter(function () {
      return this.value === cor;
    }).prop('checked', true);
    $('#btn-apagar-projeto').prop('hidden', !projeto);
    mostrarErroNome(false);

    // showModal() é um método do elemento DOM, não do jQuery: [0] obtém-no.
    $('#modal-projeto')[0].showModal();
  }

  function fecharFormularioProjeto() {
    $('#modal-projeto')[0].close();
  }

  $('#btn-novo-projeto').on('click', function () {
    abrirFormularioProjeto(null);
  });

  $('#btn-editar-projeto').on('click', function () {
    abrirFormularioProjeto(procurarProjeto(projetoSelecionadoId));
  });

  $('#btn-cancelar-projeto').on('click', fecharFormularioProjeto);

  $('#projeto-nome-input').on('input', function () {
    mostrarErroNome(false);
  });

  $('#form-projeto').on('submit', function (evento) {
    evento.preventDefault();

    const nome = $('#projeto-nome-input').val().trim();

    if (!nome) {
      mostrarErroNome(true);
      $('#projeto-nome-input').trigger('focus');
      return;
    }

    const id = $('#projeto-id').val();
    const dados = {
      nome: nome,
      cliente: $('#projeto-cliente-input').val().trim(),
      cor: $('input[name="projeto-cor"]:checked').val(),
    };

    if (id) {
      Object.assign(procurarProjeto(id), dados);
    } else {
      const novo = Object.assign(
        { id: crypto.randomUUID(), criadoEm: new Date().toISOString() },
        dados
      );
      projetos.push(novo);
      projetoSelecionadoId = novo.id;
    }

    gravar();
    fecharFormularioProjeto();
    render();
  });

  $('#btn-apagar-projeto').on('click', function () {
    const projeto = procurarProjeto($('#projeto-id').val());
    const total = tarefasDoProjeto(projeto.id).length;

    let mensagem = 'Apagar o projeto "' + projeto.nome + '"?';

    if (total === 1) {
      mensagem += '\n\nA tarefa deste projeto também vai ser apagada.';
    } else if (total > 1) {
      mensagem += '\n\nAs ' + total + ' tarefas deste projeto também vão ser apagadas.';
    }

    if (!confirm(mensagem)) {
      return;
    }

    projetos = projetos.filter(function (item) {
      return item.id !== projeto.id;
    });
    tarefas = tarefas.filter(function (tarefa) {
      return tarefa.projetoId !== projeto.id;
    });

    gravar();
    fecharFormularioProjeto();
    render();
  });

  /* Tarefas */

  function procurarTarefa(id) {
    return tarefas.find(function (tarefa) {
      return tarefa.id === id;
    });
  }

  function tarefaDoCartao(elemento) {
    return procurarTarefa($(elemento).closest('.tarefa').attr('data-id'));
  }

  function mostrarErroTitulo(mostrar) {
    $('#erro-titulo').prop('hidden', !mostrar);
    $('#tarefa-titulo-input').attr('aria-invalid', mostrar ? 'true' : null);
  }

  function abrirFormularioTarefa(tarefa) {
    // Cada tarefa pertence a um projeto, por isso sem projetos não há tarefas.
    if (projetos.length === 0) {
      alert('Para criar uma tarefa, crie primeiro um projeto.');
      abrirFormularioProjeto(null);
      return;
    }

    // Em "Todos os projetos" pré-seleciona o primeiro projeto.
    const projetoId = procurarProjeto(projetoSelecionadoId) ? projetoSelecionadoId : projetos[0].id;

    $('#modal-titulo').text(tarefa ? 'Editar tarefa' : 'Nova tarefa');
    $('#tarefa-id').val(tarefa ? tarefa.id : '');
    $('#tarefa-titulo-input').val(tarefa ? tarefa.titulo : '');
    $('#tarefa-descricao-input').val(tarefa ? tarefa.descricao : '');
    $('#tarefa-projeto-input').val(tarefa ? tarefa.projetoId : projetoId);
    $('#tarefa-prioridade-input').val(tarefa ? tarefa.prioridade : 'media');
    $('#tarefa-estado-input').val(tarefa ? tarefa.estado : 'por-fazer');
    mostrarErroTitulo(false);

    $('#modal-tarefa')[0].showModal();
  }

  function fecharFormularioTarefa() {
    $('#modal-tarefa')[0].close();
  }

  $('#btn-nova').on('click', function () {
    abrirFormularioTarefa(null);
  });

  $('#btn-cancelar').on('click', fecharFormularioTarefa);

  $('#tarefa-titulo-input').on('input', function () {
    mostrarErroTitulo(false);
  });

  $('#form-tarefa').on('submit', function (evento) {
    evento.preventDefault();

    const titulo = $('#tarefa-titulo-input').val().trim();

    if (!titulo) {
      mostrarErroTitulo(true);
      $('#tarefa-titulo-input').trigger('focus');
      return;
    }

    // Campo escondido vazio: criar. Preenchido: editar essa tarefa.
    const id = $('#tarefa-id').val();
    const dados = {
      titulo: titulo,
      descricao: $('#tarefa-descricao-input').val().trim(),
      prioridade: $('#tarefa-prioridade-input').val(),
      estado: $('#tarefa-estado-input').val(),
      projetoId: $('#tarefa-projeto-input').val(),
    };

    if (id) {
      Object.assign(procurarTarefa(id), dados);
    } else {
      tarefas.push(Object.assign(
        { id: crypto.randomUUID(), criadaEm: new Date().toISOString() },
        dados
      ));
    }

    gravar();
    fecharFormularioTarefa();
    render();
  });

  // Os cartões são recriados em cada render, por isso os eventos ficam no
  // #quadro e o jQuery verifica em que botão foi o clique.
  $('#quadro').on('click', '.btn-editar', function () {
    abrirFormularioTarefa(tarefaDoCartao(this));
  });

  $('#quadro').on('click', '.btn-apagar', function () {
    const tarefa = tarefaDoCartao(this);

    if (!confirm('Apagar a tarefa "' + tarefa.titulo + '"?')) {
      return;
    }

    tarefas = tarefas.filter(function (item) {
      return item.id !== tarefa.id;
    });

    gravar();
    render();
  });

  $('#quadro').on('change', '.tarefa-estado', function () {
    const tarefa = tarefaDoCartao(this);

    tarefa.estado = $(this).val();
    gravar();
    render();

    // O cartão foi recriado noutra coluna: devolve-lhe o foco para quem
    // usa o teclado não perder o sítio.
    $('.tarefa[data-id="' + tarefa.id + '"] .tarefa-estado').trigger('focus');
  });

  /* Pesquisa e filtro */

  $('#pesquisa').on('input', renderTarefas);
  $('#filtro-prioridade').on('change', renderTarefas);

  /* Arranque */

  function usarDadosExemplo(dados) {
    const validos = dados && Array.isArray(dados.projetos) && Array.isArray(dados.tarefas);
    const origem = validos ? dados : DADOS_EXEMPLO;

    // Cópia, para as alterações do utilizador não mexerem nas constantes.
    projetos = JSON.parse(JSON.stringify(origem.projetos));
    tarefas = JSON.parse(JSON.stringify(origem.tarefas));
    gravar();
    render();
  }

  $('#tarefa-estado-input').append(criarOpcoesEstado());

  // Só usa os dados de exemplo se a chave nunca foi gravada. Se o utilizador
  // apagar todos os projetos, a lista vazia fica guardada e não volta a
  // aparecer o exemplo ao recarregar.
  if (localStorage.getItem('projetos') === null) {
    // Aberto com file:// o browser bloqueia o pedido (e mostra um erro na
    // consola), por isso usa logo os dados definidos neste ficheiro. O
    // .fail() cobre os outros casos, por exemplo o JSON não existir.
    if (location.protocol === 'file:') {
      usarDadosExemplo(null);
    } else {
      $.ajax({ url: 'dados-exemplo.json', dataType: 'json' })
        .done(usarDadosExemplo)
        .fail(function () {
          usarDadosExemplo(null);
        });
    }
  } else {
    projetos = ler('projetos');
    tarefas = ler('tarefas');
    render();
  }

});
