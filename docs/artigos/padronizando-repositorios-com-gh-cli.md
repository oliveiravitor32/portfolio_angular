# Padronizei o nome de 29 repositórios do GitHub de uma vez com o gh CLI

Meu GitHub tinha três anos de projetos acumulados, e cada um seguia uma convenção diferente: `Pokedex-Angular`, `Lista_de_tarefas-React`, `aps_redes`, `Curso_Java_workshop-springboot-jpa-Java`, `Riftlytics`. Quem abria a lista não conseguia saber, pelo nome, do que se tratava cada projeto nem com qual tecnologia ele tinha sido feito.

Renomear 29 repositórios pela interface web, um por um, levaria uma tarde e seria fácil de errar. Fiz tudo com um script de 50 linhas usando o `gh`, a CLI oficial do GitHub. Este artigo mostra a convenção que escolhi, o script e, principalmente, o que quebra e o que não quebra quando você renomeia um repositório.

## A convenção

A regra cabe em uma linha:

```
nome-do-projeto_assunto_tecnologia
```

- **Hífen (`-`)** separa as palavras de um mesmo bloco.
- **Underline (`_`)** separa blocos de significado diferente: nome, assunto e tecnologias.
- Tudo em minúsculas e sem acento.

Alguns exemplos reais de antes e depois:

| Antes | Depois |
|---|---|
| `Pokedex-Angular` | `pokedex_angular` |
| `Sala_3D-ThreeJs-Angular` | `sala-3d_threejs_angular` |
| `Curso_Java_demo-dao-jdbc-Java` | `demo-dao-jdbc_curso_java` |
| `Aplicativo_de_bate_papo_fullstack-BackEnd-Java` | `bate-papo-fullstack_backend_java` |
| `API-Pedidos` | `api-de-pedidos_python_docker` |

Por que dois separadores? Porque o hífen sozinho não diferencia `sala-3d-threejs-angular` (onde termina o nome?) e o underline sozinho deixa nomes longos ilegíveis. Com os dois, dá para ler o nome à esquerda do primeiro `_` e a stack à direita.

Projetos abandonados ganharam o prefixo `arquivado_`. Isso os agrupa no fim da lista, em ordem alfabética, e deixa claro que não são mantidos, sem apagar o histórico:

```
Antigo_Portfolio           → arquivado_portfolio_html-css
Carrinho_de_compras-React  → arquivado_carrinho-de-compras_react
```

## Dois repositórios que não renomeei

**O repositório de perfil.** O repositório com o mesmo nome do seu usuário (no meu caso, `oliveiravitor32/oliveiravitor32`) é especial: o README dele aparece na sua página de perfil. Se você renomear esse repositório, o README some do perfil.

**Forks.** Um fork com o mesmo nome do repositório original é mais fácil de reconhecer. Renomear um fork não quebra nada, mas atrapalha quem procura de onde ele veio.

## Passo 1: listar os repositórios

Com o `gh` instalado e autenticado (`gh auth login`), dá para listar os repositórios com linguagem e descrição:

```bash
gh api "users/SEU_USUARIO/repos?per_page=100&sort=updated" \
  --jq '.[] | "\(.name)\t\(.language)\t\(.description)"'
```

A descrição ajuda a escolher o nome novo de projetos de que você nem lembra mais. Também dá para usar `gh repo list SEU_USUARIO --limit 200`, mas a chamada direta à API deixa você escolher os campos.

## Passo 2: o script, com simulação por padrão

O ponto mais importante do script é que ele **não altera nada se você não pedir**. Sem argumentos, ele só mostra o que faria. Com `--apply`, executa de verdade.

```bash
#!/usr/bin/env bash
# Uso:  bash renomear.sh          -> simulação (só mostra)
#       bash renomear.sh --apply  -> aplica
set -u
U=SEU_USUARIO
APPLY=${1:-}

mapa=(
"Pokedex-Angular|pokedex_angular"
"Sala_3D-ThreeJs-Angular|sala-3d_threejs_angular"
"Antigo_Portfolio|arquivado_portfolio_html-css"
# ... um par "nome-antigo|nome-novo" por linha
)

for par in "${mapa[@]}"; do
  antigo=${par%%|*}; novo=${par##*|}

  if [ "$APPLY" != "--apply" ]; then
    echo "[simulação] $antigo -> $novo"
    continue
  fi

  printf '%-50s -> %s ... ' "$antigo" "$novo"
  if gh api -X PATCH "repos/$U/$antigo" -f name="$novo" --silent 2>/dev/null; then
    echo OK
  else
    echo FALHOU
  fi
done
```

Algumas escolhas aqui foram de propósito:

- **O mapeamento fica explícito, linha por linha.** Seria possível gerar os nomes novos com regex, mas a convenção depende de interpretação: o `aps_redes` virou `chat-tempo-real-aps_websocket_vue` porque eu sabia do que se tratava o projeto, e nenhuma regex saberia. Escrever o mapa à mão também serviu como revisão.
- **`gh api -X PATCH` em vez de `gh repo rename`.** Os dois funcionam. Preferi a API porque ela recebe o nome antigo como parâmetro, sem precisar estar dentro de um clone local de cada repositório.
- **Uma falha não interrompe o resto.** Cada repositório imprime `OK` ou `FALHOU`, e o loop continua. No fim, você sabe exatamente quais refazer.

Rodei a simulação, revisei a saída, troquei um nome de que não gostei (`api-de-pedidos_python` virou `api-de-pedidos_python_docker`) e apliquei. Foram 29 de 29 com `OK`.

## O que quebra quando você renomeia

Essa é a parte que vale o artigo. O GitHub redireciona a URL antiga para a nova, e por isso parece que nada quebra. Mas o redirecionamento não cobre tudo.

### Não quebra

- **Links `github.com/usuario/nome-antigo`.** São redirecionados. Mesmo assim, atualize-os: se um dia você criar um repositório novo com o nome antigo, o redirecionamento deixa de valer.
- **`git push` e `git pull` em clones locais.** Também são redirecionados, mas é melhor corrigir o remote (veja abaixo).
- **Deploys na Vercel.** Eu esperava que isso quebrasse, e não quebrou. A integração da Vercel guarda o ID numérico do repositório, não o nome, e o domínio vem do nome do *projeto na Vercel*, que é independente. Meu `Pokedex-Angular` era servido em `angular-pokedex-umber.vercel.app`, e o endereço continuou o mesmo depois que o repositório virou `pokedex_angular`.

### Quebra

- **GitHub Pages.** Esse é o principal. Em um site de projeto, a URL é `usuario.github.io/nome-do-repositorio/`, então renomear o repositório **muda o endereço do site**, e o antigo para de funcionar. Meu portfólio antigo saiu de `.../Antigo_Portfolio/` para `.../arquivado_portfolio_html-css/`, e precisei atualizar o link no portfólio atual.
- **Links e badges em READMEs** que montam a URL com o nome do repositório, como badges de CI e imagens via `raw.githubusercontent.com`.
- **Qualquer integração que guarde o nome em vez do ID**, como webhooks de terceiros e pipelines configurados com `owner/repo`.

## Passo 3: corrigir os clones locais

Em cada clone, aponte o remote para o nome novo:

```bash
git remote set-url origin git@github.com:SEU_USUARIO/nome-novo.git
git remote -v   # confere
```

Com muitos clones na mesma pasta, um loop resolve, pedindo ao GitHub o nome atual de cada repositório (a API segue o redirecionamento):

```bash
for dir in */; do
  [ -d "$dir/.git" ] || continue
  url=$(git -C "$dir" remote get-url origin 2>/dev/null) || continue
  antigo=$(basename "$url" .git)
  atual=$(gh api "repos/SEU_USUARIO/$antigo" --jq .name 2>/dev/null) || continue
  if [ "$antigo" != "$atual" ]; then
    git -C "$dir" remote set-url origin "git@github.com:SEU_USUARIO/$atual.git"
    echo "$dir: $antigo -> $atual"
  fi
done
```

## Checklist

1. Defina a convenção e escreva o mapa `antigo|novo` à mão.
2. Deixe de fora o repositório de perfil e os forks.
3. Rode a simulação e revise a saída.
4. Aplique com `--apply`.
5. Procure links com o nome antigo nos seus sites e READMEs, principalmente URLs do GitHub Pages.
6. Corrija o `origin` dos clones locais.

O resultado é uma lista de repositórios que dá para entender só lendo os nomes. E, com o checklist em mãos, a próxima reorganização leva minutos.
