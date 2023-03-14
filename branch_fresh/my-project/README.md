# fresh project

### Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

- -> O comando `deno task start` foi alterado para que as permissoes sejam
  concedidas manualmente. Antes: ./deno.json -> "start": "deno run -A
  --watch=static/,routes/ dev.ts"

  Depois: ./deno.json -> "start": "deno run --watch=static/,routes/ dev.ts"

  No Deno `run -A` sgnifica `run --allow-all`

* -> A task `start-essent` foi criada para ser a start, mas com as permissões
  essenciais concedidas.

* -> A task `start-A` foi criada para ser a start, mas com todas as permissões
  concedidas.
