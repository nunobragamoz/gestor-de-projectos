import { ESTADOS, PRIORIDADES } from "../data/opcoes";

function Tarefa({ tarefa, projeto, onEditar, onApagar, onMudarEstado }) {
  return (
    <article className="tarefa" data-id={tarefa.id}>
      <header className="tarefa-topo">
        <h3 className="tarefa-titulo">{tarefa.titulo}</h3>
        <span className={`badge prioridade-${tarefa.prioridade}`}>
          {PRIORIDADES[tarefa.prioridade]}
        </span>
      </header>

      {projeto && (
        <span
          className="tarefa-projeto"
          style={{ "--cor-projeto": projeto.cor }}
        >
          {projeto.nome}
        </span>
      )}

      {tarefa.descricao && (
        <p className="tarefa-descricao">{tarefa.descricao}</p>
      )}

      <footer className="tarefa-acoes">
        <select
          className="tarefa-estado"
          aria-label="Estado da tarefa"
          value={tarefa.estado}
          onChange={(evento) => onMudarEstado(tarefa.id, evento.target.value)}
        >
          {ESTADOS.map((estado) => (
            <option key={estado.valor} value={estado.valor}>
              {estado.rotulo}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn btn-editar"
          onClick={() => onEditar(tarefa)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-apagar"
          onClick={() => onApagar(tarefa)}
        >
          Apagar
        </button>
      </footer>
    </article>
  );
}

export default Tarefa;
