const produtos = [
  {
    nome: "Batman",
    preco: 349.90,
    imagem: "../src/assets/img/batman.png"
  },

  {
    nome: "Goku",
    preco: 399.90,
    imagem: "../src/assets/img/goku.png"
  },

  {
    nome: "Homem-Aranha",
    preco: 299.90,
    imagem: "../src/assets/img/homem-aranha.png"
  },

  {
    nome: "Homem de Ferro",
    preco: 459.90,
    imagem: "../src/assets/img/homem-ferro.png"
  },

  {
    nome: "Capitão América",
    preco: 279.90,
    imagem: "../src/assets/img/capitao-america.png"
  }
];

const container = document.getElementById("cards-container");

if (container) {

  produtos.forEach(produto => {

    container.innerHTML += `
    
      <div class="card">
        <img src="${produto.imagem}" alt="${produto.nome}">
        
        <h2>${produto.nome}</h2>

        <p>R$ ${produto.preco.toFixed(2)}</p>

        <button>Comprar</button>
      </div>
    
    `;
  });

}

const carrinho = [
  {
    nome: "Batman",
    preco: 349.90
  },

  {
    nome: "Goku",
    preco: 399.90
  },

  {
    nome: "Homem de Ferro",
    preco: 459.90
  }
];

const carrinhoContainer = document.getElementById("carrinho-container");

if (carrinhoContainer) {

  carrinho.forEach(item => {

    carrinhoContainer.innerHTML += `
    
      <div class="item-carrinho">
        <h3>${item.nome}</h3>
        <p>R$ ${item.preco.toFixed(2)}</p>
      </div>
    
    `;
  });

  const total = carrinho.reduce((acumulador, item) => {
    return acumulador + item.preco;
  }, 0);

  const totalCompra = document.getElementById("total-compra");

  totalCompra.innerText = `R$ ${total.toFixed(2)}`;

  const botaoDesconto = document.getElementById("btn-desconto");

  botaoDesconto.addEventListener("click", () => {

    const totalComDesconto = total * 0.9;

    totalCompra.innerText = `R$ ${totalComDesconto.toFixed(2)}`;

  });

}