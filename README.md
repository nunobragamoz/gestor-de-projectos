# Caso Prático - Gestor de Projectos e Tarefas

Um gestor de projectos e tarefas para freelancers feito 3 vezes em tres frameworks/librarys diferentes (jQuery, React e Angular) com o mesmo design e características. Os dados são guardados no browser no localStorage e não há servidor nem base de dados.

## Estrutura

Caso-Pratico-Gestor-Projectos/
|--- versao-jquery/ ....................index.html, style.css, script.js
|--- versao-react/ ....................React app (Vite)
|--- versao-angular/ ...................Angular app
|---README.md

## Modelo de Tarefa

| Campo        | Tipo   | Valores                                    |
| ------------ | ------ | ------------------------------------------ |
| `id`         | string | `crypto.randomUUID()`                      |
| `titulo`     | string | obrigatório                                |
| `descricao`  | string | opcional                                   |
| `prioridade` | string | `baixa` · `media` · `alta`                 |
| `estado`     | string | `por-fazer` · `em-progresso` · `concluida` |
| `criadaEm`   | string | data ISO (`new Date().toISOString()`)      |

Chave no localStorage: `tarefas`
