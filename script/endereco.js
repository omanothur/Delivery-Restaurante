function criar_card_endereco(endereco) {
  const linhaNovoItem = document.createElement('li');
  linhaNovoItem.classList.add('list-item');

  linhaNovoItem.innerHTML = `
            <details>
                <summary>
                    <img src="../img/setinha_listagem.svg" alt="" class="setinha">
                    <div class="more_address_infos">
                        <div>
                            <b>Titulo:</b>
                            <span>${endereco.title || 'N/A'}</span>
                        </div>
                        <div>
                            <b>Endereço:</b>
                            <span>${endereco.address || 'N/A'}</span>
                        </div>
                        <div class="buttons-container">
                            <button>
                                <img src="../img/lixo.svg" alt="">
                            </button>
                            <button>
                                <img src="../img/edit.svg" alt="">
                            </button>
                        </div>
                    </div>
                </summary>
                <div class="address_plus">
                    <div>
                        <b>CEP:</b>
                        <span>${endereco.cep || 'N/A'}</span>
                    </div>
                    <div>
                        <b>Numero:</b>
                        <span>${endereco.number || 'N/A'}</span>
                    </div>
                    <div>
                        <b>Complemento:</b>
                        <span>${endereco.complement || 'N/A'}</span>
                    </div>
                </div>
            </details>
    `;

  linhaNovoItem.dataset.id = endereco.id;

  return linhaNovoItem;
}

async function carrregar_enderecos() {
  const list_address = document.querySelector('.list_address');

  try {
    console.log('Iniciando chamada à API...');
    spinner.style.display = 'block';
    const token = JSON.parse(localStorage.getItem('token'));
    const resposta = await fetch(
      'https://go-wash-api.onrender.com/api/auth/address',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!resposta.ok) {
      console.error('Resposta não ok:', resposta.status, resposta.statusText);
      throw new Error(`Erro ao carregar endereços: ${resposta.status}`);
    }
    const resultado = await resposta.json();
    const enderecos = resultado.data;
    console.log('Dados recebidos da API:', enderecos);

    for (const endereco of enderecos) {
      list_address.appendChild(criar_card_endereco(endereco));
    }
  } catch (error) {
    console.error('Erro completo:', error);
    list_address.innerHTML = `<div class="Error">Erro ao carregar endereços: ${error.message}</div>`;
  } finally {
    spinner.style.display = 'none';
  }
}

carrregar_enderecos();
