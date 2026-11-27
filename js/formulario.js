const formulario = document.getElementById("form-ponto");
const mensagem = document.getElementById("mensagem");
const botaoSalvar = document.getElementById("btn-salvar");
const titulo = document.getElementById("titulo-formulario");

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

async function carregarPonto() {
  if (!id) return;

  titulo.textContent = "Editar Ponto";
  botaoSalvar.textContent = "Salvar alterações";
  botaoSalvar.disabled = true;
  mensagem.textContent = "Carregando ponto...";

  try {
    const ponto = await buscarPonto(id);

    document.getElementById("nome").value = ponto.name;
    document.getElementById("descricao").value = ponto.description || "";
    document.getElementById("latitude").value = ponto.latitude;
    document.getElementById("longitude").value = ponto.longitude;

    mensagem.textContent = "";
    botaoSalvar.disabled = false;
  } catch (erro) {
    mensagem.textContent = "Erro ao carregar o ponto.";
    console.error(erro);
  }
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const ponto = {
    name: document.getElementById("nome").value.trim(),
    description: document.getElementById("descricao").value.trim(),
    latitude: Number(document.getElementById("latitude").value),
    longitude: Number(document.getElementById("longitude").value)
  };

  if (
    !ponto.name ||
    ponto.name.length > 100 ||
    ponto.description.length > 255 ||
    !Number.isFinite(ponto.latitude) ||
    !Number.isFinite(ponto.longitude) ||
    ponto.latitude < -90 ||
    ponto.latitude > 90 ||
    ponto.longitude < -180 ||
    ponto.longitude > 180
  ) {
    mensagem.textContent = "Confira os dados informados.";
    return;
  }

  botaoSalvar.disabled = true;
  mensagem.textContent = "Salvando ponto...";

  try {
    if (id) {
      await atualizarPonto(id, ponto);
    } else {
      await cadastrarPonto(ponto);
    }

    window.location.href = "index.html";
  } catch (erro) {
    mensagem.textContent = "Erro ao salvar o ponto.";
    console.error(erro);
  } finally {
    botaoSalvar.disabled = false;
  }
});

carregarPonto();
