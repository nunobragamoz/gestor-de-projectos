import { CORES_PROJETO } from "../data/opcoes";

function FormularioProjeto() {
  return (
    <dialog
      id="modal-projeto"
      className="modal"
      aria-labelledby="modal-projeto-titulo"
    >

      <form
        id="form-projeto"
        className="form"
        method="dialog"
        noValidate
      >

        <h2 id="modal-projeto-titulo">Novo projeto</h2>

        <input type="hidden" id="projeto-id" />

        <label htmlFor="projeto-nome-input">
          Nome <span aria-hidden="true">*</span>
        </label>

        <input
          type="text"
          id="projeto-nome-input"
          className="campo"
          required
          maxLength={60}
        />

        <p className="erro" id="erro-projeto-nome" hidden>
          O nome do projeto é obrigatório.
        </p>

        <label htmlFor="projeto-cliente-input">Cliente</label>

        <input
          type="text"
          id="projeto-cliente-input"
          className="campo"
          maxLength={60}
        />

        <fieldset className="cores">

          <legend>Cor</legend>

          {CORES_PROJETO.map((cor, indice) => (
            <label key={cor.valor} className="cor-opcao">
              <input
                type="radio"
                name="projeto-cor"
                value={cor.valor}
                aria-label={cor.nome}
                defaultChecked={indice === 0}
              />
              <span style={{ "--cor-projeto": cor.valor }}></span>
            </label>
          ))}

        </fieldset>

        <div className="form-acoes">

          <button
            type="button"
            id="btn-apagar-projeto"
            className="btn btn-apagar"
            hidden
          >
            Apagar projeto
          </button>

          <button type="button" id="btn-cancelar-projeto" className="btn">
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

export default FormularioProjeto;
