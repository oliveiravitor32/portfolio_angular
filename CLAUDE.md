# Portfólio (Angular) — regras para o Claude Code

Responda sempre em **português do Brasil**.

## Regras de design

- **Linhas de texto com cerca de 70 caracteres.** Já existe uma regra global em
  `src/styles.css` (`max-width: var(--max-line)`, 66ch ≈ 70 caracteres reais em média, em `p`, `li`, `dd`, `blockquote` e títulos).
  Colunas de leitura usam `max-width: var(--max-line)`.
- **Nenhuma fonte menor que 12px.** Use no mínimo `font-size: 0.75rem`.
- **Tags de tecnologia (`.tech-chip`) e hashtags dos itens de atividade em 12px** (`var(--font-size-tag)`).
- **Textos de descrição em 14px** (`var(--font-size-description)`): textos da
  experiência, descrição dos projetos,
  texto "sobre" da página inicial (as tags da stack são 12px) e sumário lateral da atividade. Não são
  descrição: o texto dentro da página da atividade e o resumo do card da
  atividade na lista.
- **Sem cantos muito arredondados:** `border-radius: 6px` (equivalente ao
  `rounded-md`). Nada de pílulas nem círculos.

## Carregamento

- **Conteúdo que demora (README do GitHub, imagens externas) mostra o
  spinner (`.spinner`) até estar pronto.** Motivo: sem isso o texto aparece
  solto, sem as imagens que dão contexto, e quando elas chegam a página dá um
  "empurrão" (layout shift), o que atrapalha a leitura. Espere as imagens
  carregarem (com um limite de tempo) antes de exibir, ou reserve o espaço
  delas.

## Fluxo

- Só faça commit quando o autor pedir.
- Conteúdo fica em `src/app/data/*.ts`; páginas e componentes leem pelo `DataService`.
