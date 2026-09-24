function ItemProjeto({ id, nome, cor, contador, ativo }) {
  return (
    <li>
      <button
        type="button"
        className={ativo ? "projeto-item ativo" : "projeto-item"}
        data-projeto={id}
        aria-current={ativo ? "true" : undefined}
        style={{ "--cor-projeto": cor }}
      >
        <span className="projeto-cor"></span>
        <span className="projeto-nome">{nome}</span>
        <span className="projeto-contador">{contador}</span>
      </button>
    </li>
  );
}

function ListaProjetos({ projetos, tarefas, projetoAtualId }) {
  return (
    <aside className="projetos" aria-label="Projetos">

      <div className="projetos-topo">

        <h2>Projetos</h2>

        <button
          type="button"
          id="btn-novo-projeto"
          className="btn btn-icone"
          aria-label="Novo projeto"
        >
          +
        </button>

      </div>

      <ul className="projetos-lista" id="projetos-lista">

        <ItemProjeto
          id="todos"
          nome="Todos os projetos"
          cor="var(--text-muted)"
          contador={tarefas.length}
          ativo={projetoAtualId === "todos"}
        />

        {projetos.map((projeto) => (
          <ItemProjeto
            key={projeto.id}
            id={projeto.id}
            nome={projeto.nome}
            cor={projeto.cor}
            contador={
              tarefas.filter((tarefa) => tarefa.projetoId === projeto.id).length
            }
            ativo={projetoAtualId === projeto.id}
          />
        ))}

      </ul>

    </aside>
  );
}

export default ListaProjetos;
