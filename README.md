# Trabalho de Conclusão PGATS — Automação de Testes na Camada de Interface (Web)

Projeto de automação E2E com **Cypress** para a aplicação Automation Exercise (https://www.automationexercise.com).

## Casos de Teste Automatizados

1. Cadastro de usuário com sucesso e exclusão de conta
2. Login com e-mail e senha corretos
3. Tentativa de login com credenciais inválidas
4. Logout de usuário
5. Tentativa de cadastro com e-mail já existente
8. Verificação de todos os produtos e página de detalhes
9. Pesquisa de produtos por nome
10. Verificação de inscrição na newsletter (Subscription)
15. Realização de pedido com cadastro antes do checkout
16. Realização de pedido com login antes do checkout

## Tecnologias

- **Cypress 13.7.3** — Framework de testes E2E
- **cypress-mochawesome-reporter** — Relatório HTML com gráficos e screenshots
- **GitHub Actions** — Pipeline de CI/CD

## Arquitetura

cypress/
├── e2e/
│   └── trabalho_final.cy.js
├── modules/
│   ├── cadastro/index.js
│   ├── login/index.js
│   ├── produtos/index.js
│   ├── carrinho/index.js
│   └── rodape/index.js
├── reports/
├── screenshots/
└── support/
    └── e2e.js

## Boas práticas aplicadas

- **Modularização**: separação entre specs (`e2e/`) e módulos (`modules/`)
- **Seletores estáveis**: uso prioritário de `[data-qa="..."]`
- **Retries automáticos**: 1 tentativa adicional em falhas
- **E-mails dinâmicos**: `Date.now()` evita conflito entre execuções
- **Independência de testes**: cada teste cadastra e deleta sua própria conta

## Como executar

```bash
# Instalar dependências
npm install

# Rodar os testes (headless)
npm test

# Rodar em modo interativo
npx cypress open
```

## Relatório

Após a execução, o relatório HTML fica em:

cypress/reports/html/index.html

## Pipeline GitHub Actions 

O projeto possui uma esteira de Integração Contínua configurada no GitHub Actions, no arquivo `.github/workflows/main.yml`.

### Gatilhos de Execução

A pipeline é disparada automaticamente nos seguintes eventos:

- **Push** na branch `main`
- **Pull Request** para a branch `main`
- **Execução manual** (via `workflow_dispatch`)

### Etapas da Pipeline

1. **Checkout do repositório** — clona o código no runner
2. **Configuração do Node.js 20** — com cache do npm
3. **Instalação de dependências** — via `npm ci`
4. **Execução dos testes Cypress** — modo headless (browser Electron)
5. **Upload do relatório** — HTML do Mochawesome publicado como artefato (retenção de 30 dias)

### Artefato gerado

Ao final da execução, o relatório HTML fica disponível para download na aba **Actions** do GitHub, na seção **Artifacts**, com o nome `relatorio-testes-html`.