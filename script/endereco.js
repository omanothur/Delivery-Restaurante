//Dentro da funcao chamar a api do professor para trazer os enderecos 
//renderizar o  html abaixo para cada item da lista que retornar da  api 

// <li>
// <details>
// <summary>
//     <img src="../img/setinha_listagem.svg" alt="" class="setinha">
//     <div class="more_address_infos">
//         <div>
//             <b>
//                 Titulo:
//             </b>
//             <span>
//                 Minha casa
//             </span>
//         </div>
//         <div>
//             <b>
//                 Endereço:
//             </b>
//             <span>
//                 Rua Brazópolis Jardim Jaú (Zona Leste)"
//             </span>
//         </div>
//         <div class="space-svg">
//             <button>
//                 <img src="../img/lixo.svg" alt="">
//             </button>
//             <button>
//                 <img src="../img/edit.svg" alt="">
//             </button>
//         </div>
//     </div>
// </summary>
// <div class="address_plus">
// <div>
//     <b>
//         CEP:
//     </b>
//     <span>
//         0370000
//     </span>
// </div>
// <div>
//     <b>
//         Numero:
//     </b>
//     <span>
//         8A
//     </span>
// </div>
// <div>
//     <b>
//         Complemento:
//     </b>
//     <span>
//         Perto de um pé de laranja
//     </span>
// </div>
// </div>
// </details>
// </li>

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
};

const requisicao = await fetch(Url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(dados),
});