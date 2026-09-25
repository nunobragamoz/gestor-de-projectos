function contar(total, singular, plural) {
  return `${total} ${total === 1 ? singular : plural}`;
}

function ProjetoAtual({ projeto, tarefas, projetos, onEditar }) {
  let nome = "Todas as tarefas";
  let resumo = `${contar(tarefas.length, "tarefa", "tarefas")} em ${contar(
    projetos.length,
    "projeto",
    "projetos"
  )}`;

  if (projeto) {
    const totalProjeto = tarefas.filter(
      (tarefa) => tarefa.projetoId === projeto.id
    ).length;

    nome = projeto.nome;
    resumo = [projeto.cliente, contar(totalProjeto, "tarefa", "tarefas")]
      .filter(Boolean)
      .join(" · ");
  }

  return (
    <div className="projeto-atual">

      <div>
        <h2 id="projeto-atual-nome">{nome}</h2>
        <p className="projeto-cliente" id="projeto-atual-cliente">
          {resumo}
        </p>
      </div>

      <button
        type="button"
        id="btn-editar-projeto"
        className="btn"
        hidden={!projeto}
        onClick={onEditar}
      >
        Editar projeto
      </button>

    </div>
  );
}

export default ProjetoAtual;
