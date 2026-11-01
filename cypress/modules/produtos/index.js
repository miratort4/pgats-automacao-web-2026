// Módulo: Produtos
// Centraliza seletores e ações da vitrine, detalhes e busca de produtos

const seletores = {
  menuProdutos: 'a[href="/products"]',
  listaProdutos: '.features_items',
  botaoViewProductPrimeiro: '.features_items .col-sm-4 a[href^="/product_details"]',  painelDetalhesProduto: '.product-information',
  campoPesquisa: '#search_product',
  botaoPesquisa: '#submit_search',
  tituloPesquisa: '.title.text-center',
};

export const produtos = {
  // Navega até a página de produtos pelo menu superior
  navegarParaProdutos() {
    cy.get(seletores.menuProdutos).click();
    cy.url().should('include', '/products');
  },

  // Confirma que a vitrine de produtos está visível
  validarListaProdutosVisivel() {
    cy.get(seletores.listaProdutos).should('be.visible');
  },

  // Clica em "View Product" do primeiro item da vitrine
  visualizarDetalhesPrimeiroProduto() {
    cy.get(seletores.botaoViewProductPrimeiro).first().click();
    cy.url().should('include', '/product_details');
  },

  // Valida que todas as informações do produto estão visíveis
  validarInformacoesDetalhadasProduto() {
    cy.get(seletores.painelDetalhesProduto).should('be.visible').within(() => {
      cy.get('h2').should('be.visible'); // Nome
      cy.get('p').should('contain', 'Category'); // Categoria
      cy.get('span span').should('be.visible'); // Preço
      cy.get('p').should('contain', 'Availability'); // Estoque
      cy.get('p').should('contain', 'Condition'); // Condição
      cy.get('p').should('contain', 'Brand'); // Marca
    });
  },

  // Pesquisa por um termo no campo de busca
  pesquisarProduto(termo) {
    cy.get(seletores.campoPesquisa).type(termo);
    cy.get(seletores.botaoPesquisa).click();
  },

  // Valida que o título "Searched Products" aparece e o termo buscado está na lista
  validarResultadoPesquisa(termoBuscado) {
    cy.get(seletores.tituloPesquisa)
      .should('be.visible')
      .and('contain', 'Searched Products');
    cy.get(seletores.listaProdutos)
      .should('be.visible')
      .and('contain', termoBuscado);
  },
};
