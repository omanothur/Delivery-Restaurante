function criar_card_endereco(endereco) {
    return `
        <li>
            <details>
                <summary>
                    <img src="../img/setinha_listagem.svg" alt="" class="setinha">
                    <div class="more_address_infos">
                        <div>
                            <b>Titulo:</b>
                            <span>${endereco.title || ''}</span>
                        </div>
                        <div>
                            <b>Endereço:</b>
                            <span>${endereco.address || ''}</span>
                        </div>
                        <div class="space-svg">
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
                        <span>${endereco.cep || ''}</span>
                    </div>
                    <div>
                        <b>Numero:</b>
                        <span>${endereco.number || ''}</span>
                    </div>
                    <div>
                        <b>Complemento:</b>
                        <span>${endereco.complement || ''}</span>
                    </div>
                </div>
            </details>
        </li>
    `;
}

async function carrregar_enderecos() {
    const list_address = document.querySelector(".list_address");
    
    try {
        console.log('Iniciando chamada à API...');
        
        const resposta = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
            headers: {
                "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLWdvLXdhc2gtZWZjOWM5NTgyNjg3Lmhlcm9rdWFwcC5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNzEwNDE3MjIyLCJuYmYiOjE3MTA0MTcyMjIsImp0aSI6InBsZll0aENEZ0U1NUNzMHEiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.z1pdEBkx8Hq01B7jNKa42NGxtFFHwb-7O_0y8krVWUY',
                "Cookie": 'gowash_session=0hGqRHf0q38ETNgEcJGce30LcPtuPKo48uKtb7Oj'
            }
        });

        if (!resposta.ok) {
            console.error('Resposta não ok:', resposta.status, resposta.statusText);
            throw new Error(`Erro ao carregar endereços: ${resposta.status}`);
        }
        const resultado  = await resposta.json();
        const enderecos = resultado.data
        console.log('Dados recebidos da API:', enderecos);
        
        let addressesHTML = '';

        for (const endereco of enderecos) {
            addressesHTML += criar_card_endereco(endereco);
        }

        list_address.innerHTML = addressesHTML;

    } catch (error) {
        console.error('Erro completo:', error);
        list_address.innerHTML = `<div class="Error">Erro ao carregar endereços: ${error.message}</div>`;
    }
}

document.addEventListener("DOMContentLoaded", carrregar_enderecos);