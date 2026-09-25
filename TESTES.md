# Testes manuais

Checklist para rever as três versões. Antes de começar, apagar o localStorage do site (DevTools → Application → Local Storage → Clear), para a app arrancar com os dados de exemplo.

Legenda: ✅ passa · ❌ falha · vazio: ainda não revisto.

## Projetos

| # | Teste | Resultado esperado | jQuery | React | Angular |
| - | ----- | ------------------ | :----: | :---: | :-----: |
| P1 | Primeira utilização | Aparecem 3 projetos e 5 tarefas de exemplo; o cabeçalho diz "5 tarefas em 3 projetos". | ✅ | | |
| P2 | Selecionar um projeto | O item fica destacado, o quadro só mostra as tarefas desse projeto e o cabeçalho mostra "Cliente · N tarefas" e o botão "Editar projeto". | ✅ | | |
| P3 | Selecionar "Todos os projetos" | Volta a "Todas as tarefas" e o botão "Editar projeto" desaparece. | ✅ | | |
| P4 | Criar projeto | Abre "Novo projeto" com a primeira cor escolhida e sem "Apagar projeto". Ao guardar, o projeto novo fica selecionado. | ✅ | | |
| P5 | Criar projeto sem nome | Aparece "O nome do projeto é obrigatório." e o foco vai para o campo. Só espaços também é rejeitado. | ✅ | | |
| P6 | Editar projeto | Abre "Editar projeto" com os campos e a cor preenchidos. Ao guardar, o nome muda na lista, no cabeçalho e nos cartões. | ✅ | | |
| P7 | Apagar projeto com tarefas | O `confirm()` diz quantas tarefas vão ser apagadas ("A tarefa…" no singular). Cancelar não apaga nada. Aceitar apaga o projeto e as tarefas dele e volta a "Todos os projetos". | ✅ | | |
| P8 | Contadores | O número de cada projeto e de "Todos os projetos" acompanha cada criação, edição e remoção de tarefas. | ✅ | | |

## Tarefas

| # | Teste | Resultado esperado | jQuery | React | Angular |
| - | ----- | ------------------ | :----: | :---: | :-----: |
| T1 | Nova tarefa em "Todos os projetos" | O formulário "Nova tarefa" abre vazio, com o primeiro projeto, "Média" e "Por Fazer". | ✅ | | |
| T2 | Nova tarefa com um projeto selecionado | O formulário pré-seleciona esse projeto. | ✅ | | |
| T3 | Criar tarefa sem título | Aparece "O título é obrigatório." e o foco vai para o campo. Só espaços também é rejeitado. | ✅ | | |
| T4 | Criar tarefa | O cartão aparece na coluna do estado escolhido, com a prioridade e o projeto; os contadores atualizam. | ✅ | | |
| T5 | Editar tarefa | Abre "Editar tarefa" com todos os campos preenchidos. Mudar o estado ou o projeto move o cartão. Não cria uma tarefa duplicada. | ✅ | | |
| T6 | Apagar tarefa | O `confirm()` mostra o título. Cancelar não apaga; aceitar remove o cartão. | ✅ | | |
| T7 | Mudar o estado no cartão | O cartão passa para a outra coluna e o foco continua no select desse cartão. | ✅ | | |
| T8 | Sem projetos | Com todos os projetos apagados, "Nova tarefa" avisa "Para criar uma tarefa, crie primeiro um projeto." e abre o formulário de projeto. | ✅ | | |
| T9 | Cancelar e Esc | Fecham o formulário sem gravar. Ao abrir de novo, o formulário está limpo. | ✅ | | |

## Dados

| # | Teste | Resultado esperado | jQuery | React | Angular |
| - | ----- | ------------------ | :----: | :---: | :-----: |
| D1 | Recarregar a página | Projetos, tarefas e estados mantêm-se. | ✅ | | |
| D2 | Apagar tudo e recarregar | Os dados de exemplo não voltam: a lista vazia fica guardada. | ✅ | | |
| D3 | localStorage corrompido | Com `tarefas` = `{isto não é json`, a app abre com as colunas vazias e sem erros. | ✅ | | |
| D4 | Texto com HTML | Um título como `<img src=x onerror=alert(1)>` aparece como texto e não é executado. | ✅ | | |
| D5 | Dados de exemplo em JSON (só jQuery) | Com um servidor local (Live Server), os dados vêm de `dados-exemplo.json` por `$.ajax()`. Aberto com `file://`, usa os dados do `script.js`. | ✅ | — | — |

## Pesquisa e filtro

| # | Teste | Resultado esperado | jQuery | React | Angular |
| - | ----- | ------------------ | :----: | :---: | :-----: |
| F1 | Pesquisar sem acentos | "orcamento" encontra "Enviar orçamento ao cliente"; "reuniao" encontra "Reunião de kickoff". | ✅ | | |
| F2 | Pesquisar na descrição e em maiúsculas | "FIGMA" encontra "Design da página inicial". | ✅ | | |
| F3 | Pesquisa sem resultados | As colunas vazias dizem "Sem resultados" (e não "Sem tarefas"). | ✅ | | |
| F4 | Pesquisa só com espaços | Conta como pesquisa vazia: aparecem todas as tarefas. | ✅ | | |
| F5 | Filtro de prioridade | Só aparecem tarefas da prioridade escolhida. | ✅ | | |
| F6 | Combinado | Projeto + prioridade + pesquisa funcionam juntos. Mudar de projeto mantém a pesquisa e o filtro. | ✅ | | |
| F7 | Tarefa nova com filtro ativo | Uma tarefa que não corresponde ao filtro não aparece até o filtro ser limpo. | ✅ | | |

## Texto muito longo

| # | Teste | Resultado esperado | jQuery | React | Angular |
| - | ----- | ------------------ | :----: | :---: | :-----: |
| L1 | Limites dos campos | Não é possível escrever mais de 80 caracteres no título, 500 na descrição e 60 no nome e no cliente do projeto. | ✅ | | |
| L2 | Palavras enormes sem espaços | Com título, descrição, nome e cliente no máximo e sem espaços, o texto passa à linha seguinte e a página nunca faz scroll horizontal (375px, 768px e 1280px). | ✅ | | |
| L3 | Nome comprido na barra lateral | A partir de 1024px o nome passa à linha seguinte dentro da barra lateral. Em mobile a fila de projetos faz scroll horizontal. | ✅ | | |

## Layout

| # | Teste | Resultado esperado | jQuery | React | Angular |
| - | ----- | ------------------ | :----: | :---: | :-----: |
| R1 | 375px (telemóvel) | Projetos numa fila de chips com scroll horizontal; colunas umas por baixo das outras; formulários em ecrã inteiro. | ✅ | | |
| R2 | 768px (tablet) | As três colunas lado a lado; os projetos continuam em chips; os formulários ficam centrados. | ✅ | | |
| R3 | 1024px ou mais | Barra lateral de projetos à esquerda, fixa ao fazer scroll. | ✅ | | |
| R4 | Igual nas três versões | Com os mesmos dados, as três versões ficam iguais nas três larguras. | ✅ | | |

## Teclado

| # | Teste | Resultado esperado | jQuery | React | Angular |
| - | ----- | ------------------ | :----: | :---: | :-----: |
| K1 | Abrir um formulário | O foco vai para o primeiro campo (título ou nome). | ✅ | | |
| K2 | Tab dentro do formulário | Percorre os campos por ordem e não passa para a página por trás do formulário. As cores são uma só paragem e mudam-se com as setas. | ✅ | | |
| K3 | Enter num campo de texto | Guarda o formulário (ou mostra o erro). | ✅ | | |
| K4 | Esc | Fecha o formulário e o foco volta ao botão que o abriu. | ✅ | | |
| K5 | Depois de guardar ou apagar | O foco não se perde: volta ao botão "Editar" do cartão, passa para o cartão seguinte ao apagar, ou para "Todos os projetos" ao apagar um projeto. | ✅ | | |
| K6 | Enter num projeto | Seleciona o projeto e o foco continua nesse projeto. | ✅ | | |
| K7 | Contorno de foco | Os botões, campos e projetos mostram um contorno visível quando recebem o foco pelo teclado. | ✅ | | |

## Registo

| Versão | Data | Browser | Notas |
| ------ | ---- | ------- | ----- |
| jQuery | 25/09/2026 | Chrome (desktop) | Corrigido: texto comprido sem espaços empurrava a página para o lado (L2, L3), e o foco do teclado perdia-se depois de redesenhar a lista (K5, K6). |
| React | | | |
| Angular | | | |

Os testes em telemóveis reais e nos outros browsers (Firefox, Edge e Safari) estão no passo 26.
