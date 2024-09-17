async function cadastrar(){
  const Url = "https://go-wash-api.onrender.com/api/user"
  let Nome = document.getElementById("name").value
  let CPF_CNPJ = document.getElementById("cpf_cnpj").value
  let Data_de_nascimento = document.getElementById("birthday").value
  let Email = document.getElementById("email").value
  let Senha = document.getElementById("password").value
  let Confirmar_Senha = document.getElementById("confirm_password").value
  let terms = document.getElementById("termos").checked

  if(Nome === ""){
    return alert("É necessário colocar seu nome completo!")
  }

  if(CPF_CNPJ === ""){
    return alert("É necessário colocar seu CPF ou CNPJ!")
  }

  if(Data_de_nascimento === ""){
    return alert("É necessário colocar sua data de nascimento!")
  }

  if(Email === ""){
    return alert("É necessário colocar seu email!")
  }

  if (Senha !== Confirmar_Senha || Confirmar_Senha === ""){
    return alert("Senha invalida")
  }

  let dados = {
    "name": Nome,
    "email": Email,
    "user_type_id": 1,
    "password": Senha,
    "cpf_cnpj": CPF_CNPJ,
    "terms": terms == true ? 1 : 0,
    "birthday": Data_de_nascimento
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  const requisicao = await fetch(Url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(dados),
  });

  if(requisicao.ok){
    const resposta = await requisicao.json();
    alert(resposta.data)
  }else{
    if(requisicao.status===500){
    return alert("Erro ao realizar seu cadastro! Tente novamente mais tarde.")
    }
    const resposta = await requisicao.json();

    if('email' in resposta.data.errors){
      return alert(resposta.data.errors.email)
    }

    if('cpf_cnpj' in resposta.data.errors){
      return alert(resposta.data.errors.cpf_cnpj)
    }
  }
}
