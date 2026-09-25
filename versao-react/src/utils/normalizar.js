// NFD separa cada letra do seu acento ("ç" passa a "c" + cedilha) e o
// replace remove os acentos, por isso "orcamento" encontra "Orçamento".
export function normalizar(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
