fetch('https://go-wash-api.onrender.com/api/auth/address')
.then(response => response.json())
.then(data => {
  // faça algo com os dados retornados
})
.catch(error => {
  // trate erros de requisição
});
