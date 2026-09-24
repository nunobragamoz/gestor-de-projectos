import BarraFerramentas from "./components/BarraFerramentas";
import FormularioProjeto from "./components/FormularioProjeto";
import FormularioTarefa from "./components/FormularioTarefa";
import ListaProjetos from "./components/ListaProjetos";
import Quadro from "./components/Quadro";
import { projetosMock, tarefasMock } from "./data/mockData";

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
          projetoAtualId="todos"
        />

        <div className="conteudo">

          <div className="projeto-atual">

            <div>
              <h2 id="projeto-atual-nome">Todas as tarefas</h2>
              <p className="projeto-cliente" id="projeto-atual-cliente">
                {tarefasMock.length} tarefas em {projetosMock.length} projetos
              </p>
            </div>

            <button
              type="button"
              id="btn-editar-projeto"
              className="btn"
              hidden
            >
              Editar projeto
            </button>

          </div>

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
