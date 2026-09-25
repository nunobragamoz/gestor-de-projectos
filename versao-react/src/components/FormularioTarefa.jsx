import { useEffect, useRef, useState } from "react";
import { ESTADOS, PRIORIDADES } from "../data/opcoes";

// O App muda a "key" deste componente sempre que o formulário abre, por isso
// cada abertura começa com um estado novo, a partir das props.
function FormularioTarefa({ aberto, projetos, projetoInicialId, onGuardar, onFechar }) {
  const dialogRef = useRef(null);
  const tituloRef = useRef(null);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [projetoId, setProjetoId] = useState(projetoInicialId);
  const [prioridade, setPrioridade] = useState("media");
  const [estado, setEstado] = useState("por-fazer");
  const [erro, setErro] = useState(false);

  // showModal() é um método do elemento DOM, por isso é preciso o ref.
  useEffect(() => {
    if (aberto && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [aberto]);

  function submeter(evento) {
    evento.preventDefault();

    const tituloLimpo = titulo.trim();

    if (!tituloLimpo) {
      setErro(true);
      tituloRef.current.focus();
      return;
    }

    onGuardar({
      titulo: tituloLimpo,
      descricao: descricao.trim(),
      prioridade,
      estado,
      projetoId,
    });
  }

  return (
    <dialog
      ref={dialogRef}
      id="modal-tarefa"
      className="modal"
      aria-labelledby="modal-titulo"
      onClose={onFechar}
    >

      <form
        id="form-tarefa"
        className="form"
        method="dialog"
        noValidate
        onSubmit={submeter}
      >

        <h2 id="modal-titulo">Nova tarefa</h2>

        <input type="hidden" id="tarefa-id" />

        <label htmlFor="tarefa-titulo-input">
          Título <span aria-hidden="true">*</span>
        </label>

        <input
          ref={tituloRef}
          type="text"
          id="tarefa-titulo-input"
          className="campo"
          required
          maxLength={80}
          value={titulo}
          aria-invalid={erro ? "true" : undefined}
          onChange={(evento) => {
            setTitulo(evento.target.value);
            setErro(false);
          }}
        />

        <p className="erro" id="erro-titulo" hidden={!erro}>
          O título é obrigatório.
        </p>

        <label htmlFor="tarefa-descricao-input">Descrição</label>

        <textarea
          id="tarefa-descricao-input"
          className="campo"
          rows={4}
          maxLength={500}
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
        ></textarea>

        <label htmlFor="tarefa-projeto-input">Projeto</label>

        <select
          id="tarefa-projeto-input"
          className="campo"
          value={projetoId}
          onChange={(evento) => setProjetoId(evento.target.value)}
        >
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
              value={prioridade}
              onChange={(evento) => setPrioridade(evento.target.value)}
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
              value={estado}
              onChange={(evento) => setEstado(evento.target.value)}
            >
              {ESTADOS.map((opcao) => (
                <option key={opcao.valor} value={opcao.valor}>
                  {opcao.rotulo}
                </option>
              ))}
            </select>

          </div>

        </div>

        <div className="form-acoes">

          <button
            type="button"
            id="btn-cancelar"
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

export default FormularioTarefa;
