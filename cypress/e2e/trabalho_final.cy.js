/// <reference types="cypress" />

// Importação dos 5 módulos com seletores e ações encapsuladas
import { cadastro } from '../modules/cadastro';
import { login } from '../modules/login';
import { produtos } from '../modules/produtos';
import { carrinho } from '../modules/carrinho';
import { rodape } from '../modules/rodape';

// Dados padrão reutilizados nos testes
const DADOS_CADASTRO = {
  senha: 'SenhaSegura123',
  dia: '10',
  mes: 'May',
  ano: '1995',
  nome: 'Juliana',
  sobrenome: 'Malveira',
  endereco: 'Rua das Automações, 100',
  pais: 'United States',
  estado: 'California',
  cidade: 'Los Angeles',
  zipcode: '90001',
  celular: '11999999999',
};

// Helper local: cadastra um novo usuário e retorna o email usado
function cadastrarUsuario(nomeCompleto, emailBase = 'aluna_pgats') {
  const email = `${emailBase}_${Date.now()}@teste.com`;
  cy.visit('/login');
  cadastro.iniciarCadastro(nomeCompleto, email);
  cadastro.preencherFormularioCompleto(DADOS_CADASTRO);
  cadastro.validarContaCriada();
  return email;
}

// Helper local: adiciona produto ao carrinho, vai pro checkout e paga
function realizarCompraCompleta(nomeNoCartao) {
  produtos.navegarParaProdutos();
  carrinho.adicionarPrimeiroProdutoAoCarrinho();
  carrinho.prosseguirParaCheckout();
  carrinho.clicarPlaceOrder();
  carrinho.preencherDadosPagamento(nomeNoCartao, '4111111111111111', '311', '12', '2028');
  carrinho.validarPedidoConcluidoComSucesso();
}

describe('Trabalho de Conclusão PGATS - Automation Exercise E2E', () => {

  // =============================================================
  // Módulo de Autenticação e Gestão de Conta (Casos 1 ao 5)
  // =============================================================

  it('Caso 1: Cadastrar usuário com sucesso e excluir conta', () => {
    cadastrarUsuario('Juliana Malveira', 'aluna_cadastro');
    login.excluirConta();
  });

  it('Caso 2: Login de usuário com e-mail e senha corretos', () => {
    const email = cadastrarUsuario('Juliana Login', 'aluna_login');
    login.efetuarLogout();

    cy.visit('/login');
    login.preencherLogin(email, DADOS_CADASTRO.senha);
    login.validarUsuarioLogado('Juliana Login');

    login.excluirConta();
  });

  it('Caso 3: Tentar login com e-mail e senha incorretos', () => {
    cy.visit('/login');
    login.preencherLogin('email_invalido_pgats@naoexist.com', 'SenhaIncorreta999');
    login.validarMensagemErroLogin('Your email or password is incorrect!');
  });

  it('Caso 4: Logout do usuário com sucesso', () => {
    cadastrarUsuario('Juliana Logout', 'aluna_logout');
    login.efetuarLogout();
    cy.url().should('include', '/login');
  });

  it('Caso 5: Tentar cadastrar usuário com e-mail já existente', () => {
    const email = cadastrarUsuario('Usuario Existente', 'aluna_existente');
    login.efetuarLogout();

    // Tenta cadastrar novamente com o mesmo email
    cy.visit('/login');
    cadastro.iniciarCadastro('Usuario Existente', email);
    cy.get('.signup-form form p')
      .should('be.visible')
      .and('contain', 'Email Address already exist!');

    // Limpa a conta criada
    cy.visit('/login');
    login.preencherLogin(email, DADOS_CADASTRO.senha);
    login.excluirConta();
  });

  // =============================================================
  // Módulo de Produtos e Pesquisa (Casos 8 e 9)
  // =============================================================

  it('Caso 8: Verificar todos os produtos e página de detalhes do produto', () => {
    cy.visit('/');
    produtos.navegarParaProdutos();
    produtos.validarListaProdutosVisivel();
    produtos.visualizarDetalhesPrimeiroProduto();
    produtos.validarInformacoesDetalhadasProduto();
  });

  it('Caso 9: Pesquisar produtos por nome', () => {
    cy.visit('/');
    produtos.navegarParaProdutos();
    produtos.pesquisarProduto('Dress');
    produtos.validarResultadoPesquisa('Dress');
  });

  // =============================================================
  // Módulo de Rodapé e Newsletter (Caso 10)
  // =============================================================

  it('Caso 10: Verificar inscrição na página inicial (Subscription)', () => {
    cy.visit('/');
    rodape.rolarAteRodape();
    rodape.preencherInscricaoNewsletter(`aluna_subscription_${Date.now()}@teste.com`);
    rodape.validarMensagemInscricaoSucesso();
  });

  // =============================================================
  // Módulo de Checkout (Casos 15 e 16)
  // =============================================================

  it('Caso 15: Realizar pedido - Cadastrar antes do Checkout', () => {
    cadastrarUsuario('Juliana Checkout', 'aluna_checkout');
    realizarCompraCompleta('Juliana Checkout');
    login.excluirConta();
  });

  it('Caso 16: Realizar pedido - Login antes do Checkout', () => {
    const email = cadastrarUsuario('Juliana LoginCheckout', 'aluna_logincheckout');
    login.efetuarLogout();

    // Faz login novamente
    cy.visit('/login');
    login.preencherLogin(email, DADOS_CADASTRO.senha);
    login.validarUsuarioLogado('Juliana LoginCheckout');

    // Realiza compra
    realizarCompraCompleta('Juliana LoginCheckout');
    login.excluirConta();
  });

});
