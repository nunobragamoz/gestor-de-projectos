import { PRIORIDADES } from "../data/opcoes";

function BarraFerramentas() {
  return (
    <section className="barra-ferramentas" aria-label="Pesquisa e filtros">
      <input
        type="search"
        id="pesquisa"
        className="campo"
        placeholder="Pesquisar tarefas…"
        aria-label="Pesquisar tarefas"
      />

      <select
        id="filtro-prioridade"
        className="campo"
        aria-label="Filtrar por prioridade"
      >
        <option value="todas">Todas as prioridades</option>
        {["alta", "media", "baixa"].map((valor) => (
          <option key={valor} value={valor}>
            {PRIORIDADES[valor]}
          </option>
        ))}
      </select>

      <button type="button" id="btn-nova" className="btn btn-primario">
        + Nova tarefa
      </button>
    </section>
  );
}

export default BarraFerramentas;
