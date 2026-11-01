// Importa o reporter para gerar screenshots nos relatórios
import 'cypress-mochawesome-reporter/register';

// Comando customizado para gerar email único (útil nos testes)
Cypress.Commands.add('gerarEmailUnico', (prefixo = 'aluna_pgats') => {
  return `${prefixo}_${Date.now()}@teste.com`;
});
