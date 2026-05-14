const produtos = [
  {
    nome: "Homem-Aranha",
    preco: 299.90,
    imagem: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?q=80&w=800&auto=format&fit=crop"
  },

  {
    nome: "Batman",
    preco: 349.90,
    imagem: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=800&auto=format&fit=crop"
  },

  {
    nome: "Capitão América",
    preco: 279.90,
    imagem: "https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?q=80&w=800&auto=format&fit=crop"
  },

  {
    nome: "Goku",
    preco: 399.90,
    imagem: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop"
  },

  {
    nome: "Homem de Ferro",
    preco: 459.90,
    imagem: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=800&auto=format&fit=crop"
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