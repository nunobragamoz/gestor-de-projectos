import { ESTADOS, PRIORIDADES } from "../data/opcoes";

function FormularioTarefa({ projetos }) {
  return (
    <dialog
      id="modal-tarefa"
      className="modal"
      aria-labelledby="modal-titulo"
    >

      <form
        id="form-tarefa"
        className="form"
        method="dialog"
        noValidate
      >

        <h2 id="modal-titulo">Nova tarefa</h2>

        <input type="hidden" id="tarefa-id" />

        <label htmlFor="tarefa-titulo-input">
          Título <span aria-hidden="true">*</span>
        </label>

        <input
          type="text"
          id="tarefa-titulo-input"
          className="campo"
          required
          maxLength={80}
        />

        <p className="erro" id="erro-titulo" hidden>
          O título é obrigatório.
        </p>

        <label htmlFor="tarefa-descricao-input">Descrição</label>

        <textarea
          id="tarefa-descricao-input"
          className="campo"
          rows={4}
          maxLength={500}
        ></textarea>

        <label htmlFor="tarefa-projeto-input">Projeto</label>

        <select id="tarefa-projeto-input" className="campo">
          {projetos.map((projeto) => (
            <option key={projeto.id} value={projeto.id}>
              {projeto.nome}
            </option>
          ))}
        </select>

        <div className="form-linha">

          <div>

            <label htmlFor="tarefa-prioridade-input">Prioridade</label>

            <select
              id="tarefa-prioridade-input"
              className="campo"
              defaultValue="media"
            >
              {Object.entries(PRIORIDADES).map(([valor, rotulo]) => (
                <option key={valor} value={valor}>
                  {rotulo}
                </option>
              ))}
            </select>

          </div>

          <div>

            <label htmlFor="tarefa-estado-input">Estado</label>

            <select
              id="tarefa-estado-input"
              className="campo"
              defaultValue="por-fazer"
            >
              {ESTADOS.map((estado) => (
                <option key={estado.valor} value={estado.valor}>
                  {estado.rotulo}
                </option>
              ))}
            </select>

          </div>

        </div>

        <div className="form-acoes">

          <button type="button" id="btn-cancelar" className="btn">
            Cancelar
          </button>
          <button type="submit" className="btn btn-primario">
            Guardar
          </button>

        </div>

      </form>

    </dialog>
  );
}

export default FormularioTarefa;
