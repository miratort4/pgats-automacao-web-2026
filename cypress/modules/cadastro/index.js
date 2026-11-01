// Módulo: Cadastro de usuário
// Centraliza seletores e ações do fluxo de Signup completo

const seletores = {
  // Tela inicial de Signup (nome + email)
  nomeCadastro: '[data-qa="signup-name"]',
  emailCadastro: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',

  // Formulário detalhado de registro
  generoMasculino: '#id_gender1',
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  endereco: '[data-qa="address"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  zipcode: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',

  // Tela final de confirmação
  mensagemContaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]',
};

export const cadastro = {
  // Passo 1: preenche nome e email iniciais e clica em "Signup"
  iniciarCadastro(nome, email) {
    cy.get(seletores.nomeCadastro).type(nome);
    cy.get(seletores.emailCadastro).type(email);
    cy.get(seletores.botaoSignup).click();
  },

  // Passo 2: preenche o formulário completo de registro
  preencherFormularioCompleto(dados) {
    cy.get(seletores.generoMasculino).check();
    cy.get(seletores.senha).type(dados.senha);
    cy.get(seletores.diaNascimento).select(dados.dia);
    cy.get(seletores.mesNascimento).select(dados.mes);
    cy.get(seletores.anoNascimento).select(dados.ano);
    cy.get(seletores.primeiroNome).type(dados.nome);
    cy.get(seletores.sobrenome).type(dados.sobrenome);
    cy.get(seletores.endereco).type(dados.endereco);
    cy.get(seletores.pais).select(dados.pais);
    cy.get(seletores.estado).type(dados.estado);
    cy.get(seletores.cidade).type(dados.cidade);
    cy.get(seletores.zipcode).type(dados.zipcode);
    cy.get(seletores.celular).type(dados.celular);
    cy.get(seletores.botaoCriarConta).click();
  },

  // Passo 3: valida a mensagem "Account Created!" e clica em Continuar
  validarContaCriada() {
    cy.get(seletores.mensagemContaCriada)
      .should('be.visible')
      .and('contain', 'Account Created');
    cy.get(seletores.botaoContinuar).click();
  },
};

