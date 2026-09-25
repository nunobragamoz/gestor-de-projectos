import { useEffect, useRef, useState } from "react";
import { CORES_PROJETO } from "../data/opcoes";

// Serve para criar (projeto = null) e para editar. O App muda a "key" sempre
// que o formulário abre, por isso cada abertura começa com um estado novo.
function FormularioProjeto({ aberto, projeto, onGuardar, onApagar, onFechar }) {
  const dialogRef = useRef(null);
  const nomeRef = useRef(null);

  const [nome, setNome] = useState(projeto?.nome ?? "");
  const [cliente, setCliente] = useState(projeto?.cliente ?? "");
  const [cor, setCor] = useState(projeto?.cor ?? CORES_PROJETO[0].valor);
  const [erro, setErro] = useState(false);

  // showModal() é um método do elemento DOM, por isso é preciso o ref.
  useEffect(() => {
    if (aberto && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [aberto]);

  function submeter(evento) {
    evento.preventDefault();

    const nomeLimpo = nome.trim();

    if (!nomeLimpo) {
      setErro(true);
      nomeRef.current.focus();
      return;
    }

    onGuardar({ nome: nomeLimpo, cliente: cliente.trim(), cor });
  }

  return (
    <dialog
      ref={dialogRef}
      id="modal-projeto"
      className="modal"
      aria-labelledby="modal-projeto-titulo"
      onClose={onFechar}
    >

      <form
        id="form-projeto"
        className="form"
        method="dialog"
        noValidate
        onSubmit={submeter}
      >

        <h2 id="modal-projeto-titulo">
          {projeto ? "Editar projeto" : "Novo projeto"}
        </h2>

        <input type="hidden" id="projeto-id" defaultValue={projeto?.id ?? ""} />

        <label htmlFor="projeto-nome-input">
          Nome <span aria-hidden="true">*</span>
        </label>

        <input
          ref={nomeRef}
          type="text"
          id="projeto-nome-input"
          className="campo"
          required
          maxLength={60}
          value={nome}
          aria-invalid={erro ? "true" : undefined}
          onChange={(evento) => {
            setNome(evento.target.value);
            setErro(false);
          }}
        />

        <p className="erro" id="erro-projeto-nome" hidden={!erro}>
          O nome do projeto é obrigatório.
        </p>

        <label htmlFor="projeto-cliente-input">Cliente</label>

        <input
          type="text"
          id="projeto-cliente-input"
          className="campo"
          maxLength={60}
          value={cliente}
          onChange={(evento) => setCliente(evento.target.value)}
        />

        <fieldset className="cores">

          <legend>Cor</legend>

          {CORES_PROJETO.map((opcao) => (
            <label key={opcao.valor} className="cor-opcao">
              <input
                type="radio"
                name="projeto-cor"
                value={opcao.valor}
                aria-label={opcao.nome}
                checked={cor === opcao.valor}
                onChange={() => setCor(opcao.valor)}
              />
              <span style={{ "--cor-projeto": opcao.valor }}></span>
            </label>
          ))}

        </fieldset>

        <div className="form-acoes">

          <button
            type="button"
            id="btn-apagar-projeto"
            className="btn btn-apagar"
            hidden={!projeto}
            onClick={onApagar}
          >
            Apagar projeto
          </button>

          <button
            type="button"
            id="btn-cancelar-projeto"
            className="btn"
            onClick={onFechar}
          >
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
