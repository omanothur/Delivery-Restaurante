function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  window.location.href = "../index.html";
}

function verification_login() {
  if ('token' in localStorage) {
    let status = true;
  } else {
    let status = false;
    window.location.href = './login.html';
  }
}

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
                            <button onclick="redirecionar_para_atualizacao(${
                              endereco.id
                            })">
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

  return linhaNovoItem;
}

async function carregar_enderecos() {
  const list_address = document.querySelector('.list_address');

  try {
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
      throw new Error(`Erro ao carregar endereços: ${resposta.status}`);
    }
    const resultado = await resposta.json();
    const enderecos = resultado.data;

    for (const endereco of enderecos) {
      list_address.appendChild(criar_card_endereco(endereco));
    }
  } catch (error) {
    list_address.innerHTML = `<div class="Error">Erro ao carregar endereços: ${error.message}</div>`;
  } finally {
    spinner.style.display = 'none';
  }
}

carregar_enderecos();

function redirecionar_para_atualizacao(id_endereco) {
  const url = `../view/atualizar_endereco.html?id_endereco=${id_endereco}`

  window.location.href = url;
}
