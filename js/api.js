const API_BASE = "https://geopoint-6x4u.onrender.com";
const POINTS_URL = `${API_BASE}/api/points`;

async function listarPontos() {
  const resposta = await fetch(POINTS_URL);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar os pontos.");
  }

  return await resposta.json();
}

async function cadastrarPonto(ponto) {
  const resposta = await fetch(POINTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ponto)
  });

  if (!resposta.ok) {
    throw new Error("Erro ao cadastrar o ponto.");
  }

  return await resposta.json();
}

async function buscarPonto(id) {
  const resposta = await fetch(
    `${POINTS_URL}/${encodeURIComponent(id)}`
  );

  if (!resposta.ok) {
    throw new Error("Erro ao buscar o ponto.");
  }

  return await resposta.json();
}

async function atualizarPonto(id, ponto) {
  const resposta = await fetch(
    `${POINTS_URL}/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ponto)
    }
  );

  if (!resposta.ok) {
    throw new Error("Erro ao atualizar o ponto.");
  }

  return await resposta.json();
}

async function deletarPonto(id) {
  const resposta = await fetch(
    `${POINTS_URL}/${encodeURIComponent(id)}`,
    {
      method: "DELETE"
    }
  );

  if (!resposta.ok) {
    throw new Error("Erro ao excluir o ponto.");
  }
}
