const IMG_BASE = window.location.pathname.includes('pages')
  ? '../src/assets/img/'
  : 'src/assets/img/';

const products = [
  {
    id: 1,
    name: "Spider-Man Homecoming",
    brand: "Marvel Legends",
    description: "Figura articulada com 30+ pontos de articulação, tela facial intercambiável e 4 acessórios exclusivos de teia.",
    price: 249.90,
    img: "homem-aranha.jpg",
    gradient: "linear-gradient(135deg, #c41e3a, #0f52ba)",
    badge: { label: "Novo", cls: "product-card__badge--new" }
  },
  {
    id: 2,
    name: "Batman Arkham Knight",
    brand: "DC Multiverse",
    description: "Figura de 18cm com armadura detalhada, capa de tecido real e 3 acessórios de batalha.",
    price: 189.90,
    img: "batman.jpg",
    gradient: "linear-gradient(135deg, #0a0a1a, #1e2d5c)",
    badge: { label: "Popular", cls: "" }
  },
  {
    id: 3,
    name: "Iron Man Mark 85",
    brand: "Marvel Legends",
    description: "Réplica premium da armadura da Guerra Infinita com LED nos olhos e no reator arc.",
    price: 349.90,
    img: "h-ferro.png",
    gradient: "linear-gradient(135deg, #c41e3a, #c8960a)",
    badge: { label: "Premium", cls: "product-card__badge--premium" }
  },
  {
    id: 4,
    name: "Goku Ultra Instinct",
    brand: "Dragon Ball Super",
    description: "Figura em pose de batalha com efeito de ki prateado e base decorativa exclusiva.",
    price: 279.90,
    img: "goku.jpg",
    gradient: "linear-gradient(135deg, #c8960a, #f97316)",
    badge: { label: "Hot", cls: "product-card__badge--hot" }
  },
  {
    id: 5,
    name: "Capitão América",
    brand: "Marvel Legends",
    description: "Figura de 30cm com escudo de vibranium magnético, uniforme detalhado e 2 mãos intercambiáveis.",
    price: 219.90,
    img: "capitao.jpg",
    gradient: "linear-gradient(135deg, #0f52ba, #c41e3a)",
    badge: null
  }
];

let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
let discountApplied = false;

function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  });
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const count = calculateItemCount(cartItems);
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

function renderProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  products.forEach((product) => {
    const article = document.createElement("article");
    article.classList.add("product-card");
    article.setAttribute("aria-label", product.name);

    article.innerHTML = `
      ${product.badge
        ? `<span class="product-card__badge ${product.badge.cls}">${product.badge.label}</span>`
        : ""}
      <div
        class="product-card__img"
        style="background: ${product.gradient};"
        role="img"
        aria-label="Imagem de ${product.name}"
      >
        ${product.img
          ? `<img src="${IMG_BASE}${product.img}" alt="${product.name}" class="product-card__photo">`
          : `<span aria-hidden="true">${product.emoji}</span>`}
      </div>
      <div class="product-card__body">
        <p class="product-card__brand">${product.brand}</p>
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__description">${product.description}</p>
        <p class="product-card__price">${formatBRL(product.price)}</p>
        <button
          class="product-card__btn"
          data-product-name="${product.name}"
          type="button"
        >
          🛒 Adicionar ao Carrinho
        </button>
      </div>
    `;

    article
      .querySelector(".product-card__btn")
      .addEventListener("click", () => {
        const existing = cartItems.find((i) => i.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cartItems.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            quantity: 1,
            img: product.img,
            emoji: product.emoji,
            gradient: product.gradient
          });
        }
        saveCart();
        updateCartBadge();
        showToast(`✅ "${product.name}" adicionado ao carrinho!`);
      });

    container.appendChild(article);
  });
}

function calculateTotal(items) {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

function calculateItemCount(items) {
  return items.reduce((acc, item) => acc + item.quantity, 0);
}

function updateSummary() {
  const subtotal   = calculateTotal(cartItems);
  const discount   = discountApplied ? subtotal * 0.1 : 0;
  const total      = subtotal - discount;
  const itemCount  = calculateItemCount(cartItems);

  const elSubtotal    = document.getElementById("subtotal-value");
  const elTotal       = document.getElementById("total-value");
  const elItemCount   = document.getElementById("item-count");
  const elDiscountRow = document.getElementById("discount-row");
  const elDiscount    = document.getElementById("discount-value");
  const elDiscountTag = document.getElementById("discount-tag");
  const btnDiscount   = document.getElementById("btn-discount");

  if (elSubtotal)  elSubtotal.textContent  = formatBRL(subtotal);
  if (elTotal)     elTotal.textContent     = formatBRL(total);
  if (elItemCount) elItemCount.textContent =
    `${itemCount} ${itemCount === 1 ? "item" : "itens"} no carrinho`;

  if (elDiscountRow && elDiscount) {
    if (discountApplied) {
      elDiscountRow.style.display = "flex";
      elDiscount.textContent = `- ${formatBRL(discount)}`;
      if (elDiscountTag) elDiscountTag.classList.add("visible");
    } else {
      elDiscountRow.style.display = "none";
      if (elDiscountTag) elDiscountTag.classList.remove("visible");
    }
  }

  if (btnDiscount) {
    const empty = cartItems.length === 0;
    btnDiscount.disabled = discountApplied || empty;
    btnDiscount.textContent = discountApplied
      ? "✅ Desconto Aplicado"
      : "🏷️ Aplicar 10% de Desconto";
  }
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  if (!cartList) return;

  cartList.innerHTML = "";

  if (cartItems.length === 0) {
    cartList.innerHTML = `
      <li style="padding: 3rem; text-align: center; color: var(--text-secondary);">
        <p style="font-size: 3rem; margin-bottom: 1rem;">🛒</p>
        <p style="font-weight: 600; margin-bottom: 0.5rem;">Seu carrinho está vazio.</p>
        <a href="../index.html" style="color: var(--primary); font-weight: 600;">
          ← Continuar comprando
        </a>
      </li>
    `;
    updateSummary();
    return;
  }

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.dataset.id = item.id;

    li.innerHTML = `
      <div
        class="cart-item__img"
        style="background: ${item.gradient};"
        aria-hidden="true"
      >${item.img
          ? `<img src="${IMG_BASE}${item.img}" alt="${item.name}" class="cart-item__photo">`
          : item.emoji}</div>
      <div class="cart-item__info">
        <p class="cart-item__brand">${item.brand}</p>
        <p class="cart-item__name">${item.name}</p>
        <p class="cart-item__quantity">
          ${item.quantity} un. × ${formatBRL(item.price)}
        </p>
      </div>
      <p class="cart-item__subtotal">${formatBRL(item.price * item.quantity)}</p>
      <button
        class="cart-item__remove"
        aria-label="Remover ${item.name} do carrinho"
        type="button"
        data-id="${item.id}"
      >✕</button>
    `;

    li.querySelector(".cart-item__remove").addEventListener("click", () => {
      removeItem(item.id);
    });

    cartList.appendChild(li);
  });

  updateSummary();
}

function removeItem(id) {
  const item = cartItems.find((i) => i.id === id);
  if (!item) return;

  cartItems = cartItems.filter((i) => i.id !== id);
  discountApplied = false;
  saveCart();
  renderCart();
  updateCartBadge();
  showToast(`🗑️ "${item.name}" removido do carrinho`);
}

function applyDiscount() {
  if (discountApplied || cartItems.length === 0) return;

  discountApplied = true;
  updateSummary();
  showToast("🎉 Desconto de 10% aplicado com sucesso!");
}

function finalizarCompra() {
  if (cartItems.length === 0) {
    showToast("⚠️ Adicione itens ao carrinho antes de finalizar.");
    return;
  }

  cartItems = [];
  discountApplied = false;
  saveCart();
  renderCart();
  updateCartBadge();

  const overlay = document.getElementById("modal-overlay");
  if (overlay) overlay.classList.add("active");
}

function fecharModal() {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) overlay.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();

  renderCart();

  updateCartBadge();

  const btnDiscount = document.getElementById("btn-discount");
  if (btnDiscount) {
    btnDiscount.addEventListener("click", applyDiscount);
  }

  const btnFinalizar = document.getElementById("btn-finalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", finalizarCompra);
  }
  const modalClose = document.getElementById("modal-close");
  if (modalClose) modalClose.addEventListener("click", fecharModal);

  const modalOverlay = document.getElementById("modal-overlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) fecharModal();
    });
  }

  const currentPath = window.location.pathname;
  document.querySelectorAll(".navbar__link").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const normalized = href.replace("../", "").replace("./", "");
    if (currentPath.endsWith(normalized)) {
      link.classList.add("active");
    }
  });
});
