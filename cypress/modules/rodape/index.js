// Módulo: Rodapé / Newsletter
// Centraliza seletores e ações da inscrição na newsletter

const seletores = {
  rodape: '#footer',
  tituloSubscription: '.single-widget h2',
  // O campo de email pode estar em vários lugares diferentes, tentamos vários
  campoEmailSubscription: '#susbcribe_email, #subscriber_email, input[name="email"], form#subscribe-form input[type="email"], #footer input[type="email"]',
  botaoSubscription: '#subscribe',
  mensagemSucesso: '.alert-success, #success-subscribe',
};

export const rodape = {
  // Rola até o rodapé e confirma que a seção "Subscription" está visível
  rolarAteRodape() {
    cy.get(seletores.rodape).scrollIntoView();
    cy.get(seletores.tituloSubscription)
      .should('be.visible')
      .and('contain', 'Subscription');
  },

  // Preenche o e-mail e clica na seta de envio
  preencherInscricaoNewsletter(email) {
    cy.get(seletores.campoEmailSubscription).type(email);
    cy.get(seletores.botaoSubscription).click();
  },

  // Valida a mensagem de sucesso da inscrição
  validarMensagemInscricaoSucesso() {
    cy.get(seletores.mensagemSucesso)
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!');
  },
};
