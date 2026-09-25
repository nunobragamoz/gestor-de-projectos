import Tarefa from "./Tarefa";

function ListaTarefas({
  estado,
  titulo,
  tarefas,
  projetos,
  mensagemVazia,
  onEditar,
  onApagar,
  onMudarEstado,
}) {
  return (
    <section className="coluna" data-estado={estado}>

      <header className="coluna-topo">
        <h2>{titulo}</h2>
        <span className="contador">{tarefas.length}</span>
      </header>

      <div className="coluna-lista">

        {tarefas.length === 0 && <p className="coluna-vazia">{mensagemVazia}</p>}

        {tarefas.map((tarefa) => (
          <Tarefa
            key={tarefa.id}
            tarefa={tarefa}
            projeto={projetos.find((projeto) => projeto.id === tarefa.projetoId)}
            onEditar={onEditar}
            onApagar={onApagar}
            onMudarEstado={onMudarEstado}
          />
        ))}

      </div>

    </section>
  );
}

export default ListaTarefas;
