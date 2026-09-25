import { useEffect, useState } from "react";
import BarraFerramentas from "./components/BarraFerramentas";
import FormularioProjeto from "./components/FormularioProjeto";
import FormularioTarefa from "./components/FormularioTarefa";
import ListaProjetos from "./components/ListaProjetos";
import ProjetoAtual from "./components/ProjetoAtual";
import Quadro from "./components/Quadro";
import { carregarProjetos, carregarTarefas, gravarLista } from "./data/armazenamento";

function App() {
  // Inicialização lazy: a função só corre na primeira renderização, por isso
  // o localStorage não é lido de novo a cada atualização.
  const [projetos, setProjetos] = useState(carregarProjetos);
  const [tarefas, setTarefas] = useState(carregarTarefas);
  const [projetoSelecionadoId, setProjetoSelecionadoId] = useState("todos");

  const [formularioTarefaAberto, setFormularioTarefaAberto] = useState(false);
  const [formularioProjetoAberto, setFormularioProjetoAberto] = useState(false);
  const [projetoEmEdicao, setProjetoEmEdicao] = useState(null);

  // Grava sempre que a lista muda.
  useEffect(() => {
    gravarLista("projetos", projetos);
  }, [projetos]);

  useEffect(() => {
    gravarLista("tarefas", tarefas);
  }, [tarefas]);

  // undefined quando está selecionado "Todos os projetos".
  const projetoSelecionado = projetos.find(
    (projeto) => projeto.id === projetoSelecionadoId
  );

  const tarefasVisiveis = projetoSelecionado
    ? tarefas.filter((tarefa) => tarefa.projetoId === projetoSelecionado.id)
    : tarefas;

  // Em "Todos os projetos" o formulário pré-seleciona o primeiro projeto.
  const projetoPadraoId = projetoSelecionado?.id ?? projetos[0]?.id ?? "";

  /* Projetos */

  function abrirFormularioProjeto(projeto) {
    setProjetoEmEdicao(projeto);
    setFormularioProjetoAberto(true);
  }

  function guardarProjeto(dados) {
    if (projetoEmEdicao) {
      setProjetos(
        projetos.map((projeto) =>
          projeto.id === projetoEmEdicao.id ? { ...projeto, ...dados } : projeto
        )
      );
    } else {
      const novo = {
        id: crypto.randomUUID(),
        criadoEm: new Date().toISOString(),
        ...dados,
      };

      setProjetos([...projetos, novo]);
      setProjetoSelecionadoId(novo.id);
    }

    setFormularioProjetoAberto(false);
  }

  function apagarProjeto() {
    const total = tarefas.filter(
      (tarefa) => tarefa.projetoId === projetoEmEdicao.id
    ).length;

    let mensagem = `Apagar o projeto "${projetoEmEdicao.nome}"?`;

    if (total === 1) {
      mensagem += "\n\nA tarefa deste projeto também vai ser apagada.";
    } else if (total > 1) {
      mensagem += `\n\nAs ${total} tarefas deste projeto também vão ser apagadas.`;
    }

    if (!confirm(mensagem)) {
      return;
    }

    setProjetos(projetos.filter((projeto) => projeto.id !== projetoEmEdicao.id));
    setTarefas(tarefas.filter((tarefa) => tarefa.projetoId !== projetoEmEdicao.id));
    setProjetoSelecionadoId("todos");
    setFormularioProjetoAberto(false);
  }

  /* Tarefas */

  function abrirNovaTarefa() {
    // Cada tarefa pertence a um projeto, por isso sem projetos não há tarefas.
    if (projetos.length === 0) {
      alert("Para criar uma tarefa, crie primeiro um projeto.");
      abrirFormularioProjeto(null);
      return;
    }

    setFormularioTarefaAberto(true);
  }

  function guardarTarefa(dados) {
    setTarefas([
      ...tarefas,
      { id: crypto.randomUUID(), criadaEm: new Date().toISOString(), ...dados },
    ]);
    setFormularioTarefaAberto(false);
  }

  return (
    <>
      <header className="topo">
        <h1>Gestor de Tarefas</h1>
        <p className="topo-subtitulo">Aqui pode organizar o seu trabalho.</p>
      </header>

      <div className="layout">

        <ListaProjetos
          projetos={projetos}
          tarefas={tarefas}
          projetoSelecionadoId={projetoSelecionado ? projetoSelecionado.id : "todos"}
          onSelecionar={setProjetoSelecionadoId}
          onNovoProjeto={() => abrirFormularioProjeto(null)}
        />

        <div className="conteudo">

          <ProjetoAtual
            projeto={projetoSelecionado}
            tarefas={tarefas}
            projetos={projetos}
            onEditar={() => abrirFormularioProjeto(projetoSelecionado)}
          />

          <BarraFerramentas onNovaTarefa={abrirNovaTarefa} />

          <Quadro tarefas={tarefasVisiveis} projetos={projetos} />

        </div>

      </div>

      <FormularioTarefa
        key={formularioTarefaAberto ? "tarefa-aberto" : "tarefa-fechado"}
        aberto={formularioTarefaAberto}
        projetos={projetos}
        projetoInicialId={projetoPadraoId}
        onGuardar={guardarTarefa}
        onFechar={() => setFormularioTarefaAberto(false)}
      />

      <FormularioProjeto
        key={formularioProjetoAberto ? "projeto-aberto" : "projeto-fechado"}
        aberto={formularioProjetoAberto}
        projeto={formularioProjetoAberto ? projetoEmEdicao : null}
        onGuardar={guardarProjeto}
        onApagar={apagarProjeto}
        onFechar={() => setFormularioProjetoAberto(false)}
      />
    </>
  );
}

export default App;
