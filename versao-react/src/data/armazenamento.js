import { projetosExemplo, tarefasExemplo } from './dadosExemplo';

// Os dados de exemplo só entram se a chave "projetos" nunca foi gravada. Se o
// utilizador apagar tudo, a lista vazia fica guardada e o exemplo não volta.
function primeiraUtilizacao() {
  return localStorage.getItem('projetos') === null;
}

// Se o JSON estiver corrompido, começa com uma lista vazia em vez de rebentar.
function lerLista(chave) {
  try {
    const dados = JSON.parse(localStorage.getItem(chave));
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

export function carregarProjetos() {
  return primeiraUtilizacao() ? projetosExemplo : lerLista('projetos');
}

export function carregarTarefas() {
  return primeiraUtilizacao() ? tarefasExemplo : lerLista('tarefas');
}

export function gravarLista(chave, lista) {
  localStorage.setItem(chave, JSON.stringify(lista));
}
