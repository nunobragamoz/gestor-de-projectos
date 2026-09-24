import BarraFerramentas from "./components/BarraFerramentas";
import FormularioTarefa from "./components/FormularioTarefa";
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
        {/* ListaProjetos entra aqui no passo 7 */}
        <aside className="projetos" aria-label="Projetos"></aside>

        <div className="conteudo">
          {/* Projeto atual entra aqui no passo 7 */}
          <BarraFerramentas />
          <Quadro tarefas={tarefasMock} projetos={projetosMock} />
        </div>
      </div>

      <FormularioTarefa projetos={projetosMock} />
    </>
  );
}

export default App;
