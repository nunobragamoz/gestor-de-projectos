// Se a chave nunca foi gravada (primeira utilização), começa com os dados de
// exemplo. Se o utilizador apagar tudo, a lista vazia fica guardada e o
// exemplo não volta.
export function carregarLista<T>(chave: string, exemplo: T[]): T[] {
  const guardado = localStorage.getItem(chave);

  if (guardado === null) {
    return exemplo;
  }

  // Se o JSON estiver corrompido, começa com uma lista vazia em vez de rebentar.
  try {
    const dados: unknown = JSON.parse(guardado);
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

export function gravarLista<T>(chave: string, lista: T[]): void {
  localStorage.setItem(chave, JSON.stringify(lista));
}
