let carrinho = [];

function adicionarCarrinho(nome, preco) {
  let achado = carrinho.find(item => item.nome === nome);
  if (achado) {
    achado.qtd++;
  } else {
    carrinho.push({ nome: nome, preco: preco, qtd: 1 });
  }
  atualizarCarrinho();
}

function mudarQtd(nome, quanto) {
  let achado = carrinho.find(item => item.nome === nome);
  if (!achado) return;
  achado.qtd += quanto;
  if (achado.qtd <= 0) {
    removerItem(nome);
  } else {
    atualizarCarrinho();
  }
}

function removerItem(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  let lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";
  let total = 0;
  let totalItens = 0;

  carrinho.forEach(item => {
    total += item.preco * item.qtd;
    totalItens += item.qtd;
    let li = document.createElement("li");
    li.innerHTML = item.nome + " - R$ " + (item.preco * item.qtd).toFixed(2).replace(".", ",") +
      "<br><button class='btn-peq' onclick=\"mudarQtd('" + item.nome + "', -1)\">-</button> " +
      item.qtd + " <button class='btn-peq' onclick=\"mudarQtd('" + item.nome + "', 1)\">+</button>" +
      "<button class='btn-remover' onclick=\"removerItem('" + item.nome + "')\">Remover</button>";
    lista.appendChild(li);
  });

  document.getElementById("total").innerText = "Total: R$ " + total.toFixed(2).replace(".", ",");
  document.getElementById("contador").innerText = "Carrinho: " + totalItens + " item(ns) R$ " + total.toFixed(2).replace(".", ",");
}

function pesquisar() {
  let texto = document.getElementById("pesquisa").value.toLowerCase();
  let produtos = document.querySelectorAll(".produto");
  produtos.forEach(p => {
    let nome = p.querySelector("h3").innerText.toLowerCase();
    p.style.display = nome.includes(texto) ? "block" : "none";
  });
}

function irParaCheckout() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
  } else {
    window.location.href = "checkout.html";
  }
}