# Portfólio (Angular) — regras para o Claude Code

Responda sempre em **português do Brasil**.

## Regras de design

- **Linhas de texto com cerca de 70 caracteres.** Já existe uma regra global em
  `src/styles.css` (`max-width: var(--max-line)`, 66ch ≈ 70 caracteres reais em média, em `p`, `li`, `dd`, `blockquote` e títulos).
  Colunas de leitura usam `max-width: var(--max-line)`.
- **Nenhuma fonte menor que 16px.** Use no mínimo `font-size: 1rem`; nunca
  `0.9rem`, `0.8rem`, `14px` etc.
- **Sem cantos muito arredondados:** `border-radius: 6px` (equivalente ao
  `rounded-md`). Nada de pílulas nem círculos.

## Fluxo

- Só faça commit quando o autor pedir.
- Conteúdo fica em `src/app/data/*.ts`; páginas e componentes leem pelo `DataService`.
