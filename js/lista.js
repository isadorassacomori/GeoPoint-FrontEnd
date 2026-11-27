const tabela = document.getElementById("tabela-pontos");
const filtro = document.getElementById("filtro");
const mensagem = document.getElementById("mensagem");

let pontos = [];

function criarLinhaPonto(ponto) {
  const linha = document.createElement("tr");

  const nome = document.createElement("td");
  const link = document.createElement("a");
  link.href = `ponto.html?id=${encodeURIComponent(ponto.id)}`;
  link.textContent = ponto.name;
  nome.appendChild(link);

  const descricao = document.createElement("td");
  descricao.textContent = ponto.description || "-";

  const latitude = document.createElement("td");
  latitude.textContent = ponto.latitude;

  const longitude = document.createElement("td");
  longitude.textContent = ponto.longitude;

  const acoes = document.createElement("td");

  const ver = document.createElement("a");
  ver.href = `ponto.html?id=${encodeURIComponent(ponto.id)}`;
  ver.textContent = "Ver";
  ver.className = "botao-ver";

  const editar = document.createElement("a");
  editar.href = `formulario.html?id=${encodeURIComponent(ponto.id)}`;
  editar.textContent = "Editar";
  editar.className = "botao-editar";

  const excluir = document.createElement("button");
  excluir.textContent = "Excluir";
  excluir.className = "botao-excluir";
  excluir.addEventListener("click", () => excluirPonto(ponto.id));

  acoes.append(ver, " ", editar, " ", excluir);
  linha.append(nome, descricao, latitude, longitude, acoes);

  return linha;
}

function mostrarPontos(lista) {
  tabela.textContent = "";

  if (lista.length === 0) {
    mensagem.textContent = "Nenhum ponto encontrado.";
    return;
  }

  mensagem.textContent = "";

  lista.forEach((ponto) => {
    const linha = criarLinhaPonto(ponto);
    tabela.appendChild(linha);
  });
}

async function carregarPontos() {
  mensagem.textContent = "Carregando pontos...";

  try {
    pontos = await listarPontos();
    filtrarPontos();
  } catch (erro) {
    mensagem.textContent = "Erro ao carregar os pontos.";
    console.error(erro);
  }
}

function filtrarPontos() {
  const pesquisa = filtro.value.toLowerCase();

  const resultado = pontos.filter((ponto) =>
    ponto.name.toLowerCase().includes(pesquisa)
  );

  mostrarPontos(resultado);
}

filtro.addEventListener("input", filtrarPontos);

async function excluirPonto(id) {
  const confirmou = confirm(
    "Tem certeza que deseja excluir este ponto?"
  );

  if (!confirmou) {
    return;
  }

  try {
    await deletarPonto(id);

    pontos = pontos.filter((ponto) => ponto.id !== id);

    filtrarPontos();

  } catch (erro) {
    alert("Erro ao excluir o ponto.");
    console.error(erro);
  }
}

carregarPontos();