function resetFieldsErrors(
    emailError,
    passwordError,
  ) {

    emailError.classList.remove('field-error-active');
    emailError.innerHTML = '';
  
    passwordError.classList.remove('field-error-active');
    passwordError.innerHTML = '';

  }
  
  function checkFields(
    email,
    password,
  ) {
    let emailError = document.getElementById('emailError');
    let passwordError = document.getElementById('passwordError');

  
  resetFieldsErrors(
    emailError,
    passwordError,
  );
  
  let hasError = false;
  

  
  if(email.value === ""){
    hasError = true;
    emailError.innerHTML = 'Preencha o campo e-mail ou cpf/cnpj'
    emailError.classList.add('field-error-active')
  }
  
  if(password.value === ''){
    hasError = true;
    passwordError.innerHTML = 'Preencha o campo senha'
    passwordError.classList.add('field-error-active')
  }

  return {hasError};
  }
  
  
  async function login(){
    const Url = "https://go-wash-api.onrender.com/api/login"
    let Email = document.getElementById("email")
    let Senha = document.getElementById("password")
  
    const fieldErrors = checkFields(
      Email,
      Senha,
    )
  
    if(fieldErrors.hasError){
      return
    }
  
    let dados = {
        "email": Email.value,
        "password": Senha.value,
        "user_type_id": 1
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
      
      if(resposta.data.errors && resposta.data.errors.email){
        return alert(resposta.data.errors.email)
      } else if(resposta.data.errors && resposta.data.errors.cpf_cnpj){
        return alert(resposta.data.errors.cpf_cnpj)
      } else {
        return alert(resposta.data.errors)
      }
    
    }
  }