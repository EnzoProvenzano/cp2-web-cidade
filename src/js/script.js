const produtos = [
  {
    nome: "Homem-Aranha",
    preco: 299.90,
    imagem: "./src/assets/img/homem-aranha.jpg"
  },

  {
    nome: "Batman",
    preco: 349.90,
    imagem: "./src/assets/img/batman.jpg"
  },

  {
    nome: "Capitão América",
    preco: 279.90,
    imagem: "./src/assets/img/capitao.jpg"
  },

  {
    nome: "Goku",
    preco: 399.90,
    imagem: "./src/assets/img/goku.jpg"
  },

  {
    nome: "Homem de Ferro",
    preco: 459.90,
    imagem: "./src/assets/img/h-ferro.png"
  }
];

const container = document.getElementById("cards-container");

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