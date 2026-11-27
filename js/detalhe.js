const detalhes = document.getElementById("detalhes");
const mensagem = document.getElementById("mensagem");

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

async function carregarDetalhes() {
  if (!id) {
    mensagem.textContent = "Ponto não informado.";
    return;
  }

  try {
    const ponto = await buscarPonto(id);

    mensagem.textContent = "";

    const nome = document.createElement("h3");
    nome.textContent = ponto.name;

    const descricao = document.createElement("p");
    descricao.textContent = `Descrição: ${ponto.description || "-"}`;

    const latitude = document.createElement("p");
    latitude.textContent = `Latitude: ${ponto.latitude}`;

    const longitude = document.createElement("p");
    longitude.textContent = `Longitude: ${ponto.longitude}`;

    const identificador = document.createElement("p");
    identificador.textContent = `ID: ${ponto.id}`;

    const editar = document.createElement("a");
    editar.href = `formulario.html?id=${encodeURIComponent(ponto.id)}`;
    editar.textContent = "Editar ponto";

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir ponto";
    excluir.className = "botao-excluir";

    excluir.addEventListener("click", excluirPonto);

    const acoes = document.createElement("div");
    acoes.className = "acoes-detalhe";

    editar.className = "botao-editar";

    acoes.append(editar, excluir);

    detalhes.append(
      nome,
      descricao,
      latitude,
      longitude,
      identificador,
      acoes
    );

  } catch (erro) {
    mensagem.textContent = "Erro ao carregar os detalhes.";
    console.error(erro);
  }
}

async function excluirPonto() {
  const confirmou = confirm("Deseja excluir este ponto?");

  if (!confirmou) {
    return;
  }

  try {
    await deletarPonto(id);
    window.location.href = "index.html";
  } catch (erro) {
    mensagem.textContent = "Erro ao excluir o ponto.";
    console.error(erro);
  }
}

carregarDetalhes();
