// Módulo: Carrinho e Checkout
// Centraliza seletores e ações do fluxo de compra e pagamento

const seletores = {
  botaoAdicionarAoCarrinho: '.add-to-cart',
  modalSucessoAdicao: '#cartModal',
  linkVerCarrinhoModal: '#cartModal u',
  menuCarrinho: 'header a[href="/view_cart"]',
  botaoProceedToCheckout: '.btn.btn-default.check_out',
  botaoPlaceOrder: 'a[href="/payment"]',
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvcCartao: '[data-qa="cvc"]',
  mesExpiracao: '[data-qa="expiry-month"]',
  anoExpiracao: '[data-qa="expiry-year"]',
  botaoPagarEConfirmar: '[data-qa="pay-button"]',
  mensagemSucessoPedido: '[data-qa="order-placed"]',
};

export const carrinho = {
  // Adiciona o primeiro produto da vitrine ao carrinho e abre o carrinho pelo modal
  adicionarPrimeiroProdutoAoCarrinho() {
    cy.get(seletores.botaoAdicionarAoCarrinho).first().click();
    cy.get(seletores.modalSucessoAdicao).should('be.visible');
    cy.get(seletores.linkVerCarrinhoModal).click();
  },

  // Acessa o carrinho pelo menu superior
  irParaCarrinho() {
    cy.get(seletores.menuCarrinho).click();
  },

  // Avança para a tela de checkout
  prosseguirParaCheckout() {
    cy.get(seletores.botaoProceedToCheckout).click();
    cy.url().should('include', '/checkout');
  },

  // Clica em "Place Order" para ir à tela de pagamento
  clicarPlaceOrder() {
    cy.get(seletores.botaoPlaceOrder).click();
    cy.url().should('include', '/payment');
  },

  // Preenche os dados do cartão e confirma o pagamento
  preencherDadosPagamento(nome, numero, cvc, mes, ano) {
    cy.get(seletores.nomeCartao).type(nome);
    cy.get(seletores.numeroCartao).type(numero);
    cy.get(seletores.cvcCartao).type(cvc);
    cy.get(seletores.mesExpiracao).type(mes);
    cy.get(seletores.anoExpiracao).type(ano);
    cy.get(seletores.botaoPagarEConfirmar).click();
  },

  // Valida a mensagem "ORDER PLACED!"
  validarPedidoConcluidoComSucesso() {
    cy.get(seletores.mensagemSucessoPedido)
      .should('be.visible')
      .and('contain', 'Order Placed');
  },
};
