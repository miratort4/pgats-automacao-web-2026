// Módulo: Login e Logout
// Centraliza seletores e ações da tela de autenticação

const seletores = {
  campoEmailLogin: '[data-qa="login-email"]',
  campoSenhaLogin: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  linkLogout: 'a[href="/logout"]',
  linkDeleteAccount: 'a[href="/delete_account"]',
  mensagemContaExcluida: '[data-qa="account-deleted"]',
  botaoContinuarExclusao: '[data-qa="continue-button"]',
  usuarioLogadoHeader: 'header li a b',
  mensagemErroLogin: '.login-form form p',
};

export const login = {
  // Preenche e-mail e senha e clica em "Login"
  preencherLogin(email, senha) {
    cy.get(seletores.campoEmailLogin).type(email);
    cy.get(seletores.campoSenhaLogin).type(senha);
    cy.get(seletores.botaoLogin).click();
  },

  // Valida que o nome do usuário aparece no cabeçalho (ex: "Logged in as Juliana")
  validarUsuarioLogado(nomeUsuario) {
    cy.get(seletores.usuarioLogadoHeader)
      .should('be.visible')
      .and('contain', nomeUsuario);
  },

  // Valida a mensagem de erro quando login falha
  validarMensagemErroLogin(textoEsperado = 'Your email or password is incorrect!') {
    cy.get(seletores.mensagemErroLogin)
      .should('be.visible')
      .and('contain', textoEsperado);
  },

  // Clica em "Logout"
  efetuarLogout() {
    cy.get(seletores.linkLogout).click();
  },

  // Clica em "Delete Account" e valida a mensagem de confirmação
  excluirConta() {
    cy.get(seletores.linkDeleteAccount).click();
    cy.get(seletores.mensagemContaExcluida)
      .should('be.visible')
      .and('contain', 'Account Deleted');
    cy.get(seletores.botaoContinuarExclusao).click();
  },
};
