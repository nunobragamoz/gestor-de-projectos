import BarraFerramentas from "./components/BarraFerramentas";
import FormularioProjeto from "./components/FormularioProjeto";
import FormularioTarefa from "./components/FormularioTarefa";
import ListaProjetos from "./components/ListaProjetos";
import ProjetoAtual from "./components/ProjetoAtual";
import Quadro from "./components/Quadro";
import { projetosMock, tarefasMock } from "./data/mockData";

// Passa a useState no passo 16.
const projetoSelecionadoId = "todos";

function App() {
  return (
    <>
      <header className="topo">
        <h1>Gestor de Tarefas</h1>
        <p className="topo-subtitulo">Aqui pode organizar o seu trabalho.</p>
      </header>

      <div className="layout">

        <ListaProjetos
          projetos={projetosMock}
          tarefas={tarefasMock}
          projetoSelecionadoId={projetoSelecionadoId}
        />

        <div className="conteudo">

          <ProjetoAtual
            projeto={projetosMock.find(
              (projeto) => projeto.id === projetoSelecionadoId
            )}
            tarefas={tarefasMock}
            projetos={projetosMock}
          />

          <BarraFerramentas />

          <Quadro tarefas={tarefasMock} projetos={projetosMock} />

        </div>

      </div>

      <FormularioTarefa projetos={projetosMock} />

      <FormularioProjeto />
    </>
  );
}

export default App;
