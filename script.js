const botoes = document.querySelectorAll('.btn-add');
const listaCarrinho = document.querySelector('#lista-carrinho');
const valorTotalEl = document.querySelector('#valor-total');
const btnLimpar = document.querySelector('#btn-limpar');
const mensagemVazia = document.querySelector('#mensagem-vazia');
const mensagem = document.querySelector('#mensagem');

let carrinho = [];

function formatarPreco(valor) {
  return valor.toFixed(2).replace('.', ',');
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, indice) => {
    total += item.preco * item.quantidade;

    const li = document.createElement('li');
    li.classList.add('item-carrinho');

    const informacoes = document.createElement('div');

    const nome = document.createElement('p');
    nome.classList.add('nome-item');
    nome.textContent = item.nome;

    const detalhe = document.createElement('p');
    detalhe.classList.add('detalhe-item');
    detalhe.textContent = `${item.quantidade} x R$ ${formatarPreco(item.preco)}`;

    informacoes.appendChild(nome);
    informacoes.appendChild(detalhe);

    const acoes = document.createElement('div');
    acoes.classList.add('acoes-item');

    const diminuir = document.createElement('button');
    diminuir.classList.add('btn-qtd');
    diminuir.textContent = '−';
    diminuir.setAttribute('aria-label', `Diminuir quantidade de ${item.nome}`);
    diminuir.addEventListener('click', () => {
      if (item.quantidade > 1) {
        item.quantidade--;
      } else {
        carrinho.splice(indice, 1);
      }
      atualizarCarrinho();
    });

    const quantidade = document.createElement('span');
    quantidade.textContent = item.quantidade;

    const aumentar = document.createElement('button');
    aumentar.classList.add('btn-qtd');
    aumentar.textContent = '+';
    aumentar.setAttribute('aria-label', `Aumentar quantidade de ${item.nome}`);
    aumentar.addEventListener('click', () => {
      item.quantidade++;
      atualizarCarrinho();
    });

    const remover = document.createElement('button');
    remover.classList.add('btn-remover');
    remover.textContent = 'Remover';
    remover.addEventListener('click', () => {
      carrinho.splice(indice, 1);
      atualizarCarrinho();
      mensagem.textContent = `${item.nome} removido do carrinho.`;
    });

    acoes.appendChild(diminuir);
    acoes.appendChild(quantidade);
    acoes.appendChild(aumentar);
    acoes.appendChild(remover);

    li.appendChild(informacoes);
    li.appendChild(acoes);
    listaCarrinho.appendChild(li);
  });

  valorTotalEl.textContent = formatarPreco(total);
  mensagemVazia.style.display = carrinho.length === 0 ? 'block' : 'none';
}

botoes.forEach((botao) => {
  botao.addEventListener('click', () => {
    const nome = botao.dataset.nome;
    const preco = parseFloat(botao.dataset.preco);
    const itemEncontrado = carrinho.find((item) => item.nome === nome);

    if (itemEncontrado) {
      itemEncontrado.quantidade++;
    } else {
      carrinho.push({
        nome: nome,
        preco: preco,
        quantidade: 1
      });
    }

    mensagem.textContent = `${nome} adicionado ao carrinho.`;
    atualizarCarrinho();
  });
});

btnLimpar.addEventListener('click', () => {
  carrinho = [];
  mensagem.textContent = 'Carrinho esvaziado.';
  atualizarCarrinho();
});

atualizarCarrinho();
