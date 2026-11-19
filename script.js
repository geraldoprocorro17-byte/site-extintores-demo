// PERSONALIZE AQUI: informe o WhatsApp REAL da empresa, só números.
// Exemplo: "5512999999999". Deixe vazio durante a demonstração.
const WHATSAPP_EMPRESA = "";

// Menu no celular
const botaoMenu = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu-links");
botaoMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", String(aberto));
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});
menu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  });
});

// Filtros dos extintores
const filtros = document.querySelectorAll(".filtro");
const produtos = document.querySelectorAll(".produto-card");
filtros.forEach(botao => {
  botao.addEventListener("click", () => {
    const tipo = botao.dataset.filtro;
    filtros.forEach(item => {
      const ativo = item === botao;
      item.classList.toggle("ativo", ativo);
      item.setAttribute("aria-pressed", String(ativo));
    });
    produtos.forEach(produto => {
      produto.hidden = tipo !== "todos" && produto.dataset.tipo !== tipo;
    });
  });
});

// Ao clicar em 'Solicitar cotação', pré-seleciona o serviço no formulário
let produtoEscolhido = "";
document.querySelectorAll("[data-produto]").forEach(link => {
  link.addEventListener("click", () => {
    produtoEscolhido = link.dataset.produto;
    document.querySelector("#servico").value = "Venda de extintores";
    document.querySelector("#mensagem").value = `Gostaria de um orçamento para: ${produtoEscolhido}.`;
  });
});

// Formulário que prepara a mensagem do WhatsApp
const formulario = document.querySelector("#form-orcamento");
formulario.addEventListener("submit", event => {
  event.preventDefault();
  const nome = document.querySelector("#nome").value.trim();
  const telefone = document.querySelector("#telefone").value.trim();
  const servico = document.querySelector("#servico").value;
  const detalhes = document.querySelector("#mensagem").value.trim();
  const texto = [
    "Olá! Gostaria de solicitar um orçamento.",
    `Nome: ${nome}`,
    `Meu WhatsApp: ${telefone}`,
    `Serviço: ${servico}`,
    detalhes ? `Detalhes: ${detalhes}` : ""
  ].filter(Boolean).join("\n");

  if (!/^\d{12,13}$/.test(WHATSAPP_EMPRESA)) {
    alert("Este é um site de demonstração. Antes de usar com clientes, configure o número real no arquivo script.js.\n\nMensagem preparada:\n" + texto);
    return;
  }
  const url = `https://wa.me/${WHATSAPP_EMPRESA}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

// Atualiza o ano do rodapé
 document.querySelector("#ano").textContent = new Date().getFullYear();
