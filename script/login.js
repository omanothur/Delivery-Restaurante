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
    let loader = document.getElementById("loader")
    let submitText = document.getElementById("submitText")
    let submitButton = document.getElementById('submitButton')
  
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

    loader.classList.add('show')
    submitText.classList.add("invisible")
    submitButton.disabled = true
  
    const requisicao = await fetch(Url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(dados),
    });

    loader.classList.remove('show')
    submitText.classList.remove("invisible")
    submitButton.disabled = false
  
    if(requisicao.ok){
      const resposta = await requisicao.json();
      alert(`Bem vindo, ${resposta.user.name}`)
      localStorage.setItem('userData', JSON.stringify(resposta.user))
      localStorage.setItem('token', JSON.stringify(resposta.access_token))
      
    }else{
      if(requisicao.status===500){
      return alert("Erro ao realizar seu login! Tente novamente mais tarde.")
      }

      const resposta = await requisicao.json();   
      return alert(resposta.data.errors)
    }
  }