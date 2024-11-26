//vini testando um bglh para prova final (sorry amigos)

const url = "https://worldtimeapi.org/api/timezone/Etc/UTC";

async function HoraAtual() {
  const relogio = document.getElementById("relogio");
  relogio.textContent = "Carregando hora...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const hora = new Date(data.datetime).toLocaleTimeString();
    relogio.textContent = hora; // essa poha atualiza a hora no HTML

  } catch (error) {
    console.error("Erro: ", error);
    relogio.textContent = "Erro ao carregar a hora.";
  }
}

// abre a pagina e já sera exibida 
window.onload = HoraAtual;
