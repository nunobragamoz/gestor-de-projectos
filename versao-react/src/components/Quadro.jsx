import { ESTADOS } from "../data/opcoes";
import ListaTarefas from "./ListaTarefas";

function Quadro({ tarefas, projetos, onEditar, onApagar, onMudarEstado }) {
  return (
    <main className="quadro" id="quadro">

      {ESTADOS.map((estado) => (
        <ListaTarefas
          key={estado.valor}
          estado={estado.valor}
          titulo={estado.titulo}
          tarefas={tarefas.filter((tarefa) => tarefa.estado === estado.valor)}
          projetos={projetos}
          onEditar={onEditar}
          onApagar={onApagar}
          onMudarEstado={onMudarEstado}
        />
      ))}

    </main>
  );
}

export default Quadro;
