import Tarefa from "./Tarefa";

function ListaTarefas({ estado, titulo, tarefas, projetos }) {
  return (
    <section className="coluna" data-estado={estado}>

      <header className="coluna-topo">
        <h2>{titulo}</h2>
        <span className="contador">{tarefas.length}</span>
      </header>

      <div className="coluna-lista">

        {tarefas.length === 0 && <p className="coluna-vazia">Sem tarefas</p>}

        {tarefas.map((tarefa) => (
          <Tarefa
            key={tarefa.id}
            tarefa={tarefa}
            projeto={projetos.find((projeto) => projeto.id === tarefa.projetoId)}
          />
        ))}

      </div>

    </section>
  );
}

export default ListaTarefas;
