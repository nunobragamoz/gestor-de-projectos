import { ESTADOS } from "../data/opcoes";
import ListaTarefas from "./ListaTarefas";

function Quadro({ tarefas, projetos }) {
  return (
    <main className="quadro" id="quadro">

      {ESTADOS.map((estado) => (
        <ListaTarefas
          key={estado.valor}
          estado={estado.valor}
          titulo={estado.titulo}
          tarefas={tarefas.filter((tarefa) => tarefa.estado === estado.valor)}
          projetos={projetos}
        />
      ))}

    </main>
  );
}

export default Quadro;
