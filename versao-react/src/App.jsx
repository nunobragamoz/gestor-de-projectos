import { useEffect, useState } from "react";
import BarraFerramentas from "./components/BarraFerramentas";
import FormularioProjeto from "./components/FormularioProjeto";
import FormularioTarefa from "./components/FormularioTarefa";
import ListaProjetos from "./components/ListaProjetos";
import ProjetoAtual from "./components/ProjetoAtual";
import Quadro from "./components/Quadro";
import { carregarProjetos, carregarTarefas, gravarLista } from "./data/armazenamento";

// Passa a useState no passo 16.
const projetoSelecionadoId = "todos";

function App() {
  // Inicialização lazy: a função só corre na primeira renderização, por isso
  // o localStorage não é lido de novo a cada atualização.
  const [projetos] = useState(carregarProjetos);
  const [tarefas, setTarefas] = useState(carregarTarefas);
  const [formularioTarefaAberto, setFormularioTarefaAberto] = useState(false);

  // Grava sempre que a lista muda.
  useEffect(() => {
    gravarLista("projetos", projetos);
  }, [projetos]);

  useEffect(() => {
    gravarLista("tarefas", tarefas);
  }, [tarefas]);

  const projetoSelecionado = projetos.find(
    (projeto) => projeto.id === projetoSelecionadoId
  );

  // Em "Todos os projetos" o formulário pré-seleciona o primeiro projeto.
  const projetoPadraoId = projetoSelecionado?.id ?? projetos[0]?.id ?? "";

  function abrirNovaTarefa() {
    // Cada tarefa pertence a um projeto, por isso sem projetos não há tarefas.
    if (projetos.length === 0) {
      alert("Para criar uma tarefa, crie primeiro um projeto.");
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
          projetoSelecionadoId={projetoSelecionadoId}
        />

        <div className="conteudo">

          <ProjetoAtual
            projeto={projetoSelecionado}
            tarefas={tarefas}
            projetos={projetos}
          />

          <BarraFerramentas onNovaTarefa={abrirNovaTarefa} />

          <Quadro tarefas={tarefas} projetos={projetos} />

        </div>

      </div>

      <FormularioTarefa
        key={formularioTarefaAberto ? "aberto" : "fechado"}
        aberto={formularioTarefaAberto}
        projetos={projetos}
        projetoInicialId={projetoPadraoId}
        onGuardar={guardarTarefa}
        onFechar={() => setFormularioTarefaAberto(false)}
      />

      <FormularioProjeto />
    </>
  );
}

export default App;
