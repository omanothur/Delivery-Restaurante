function resetFieldsErrors(
  nameError,
  cpf_cnpjError,
  birthdayError,
  emailError,
  passwordError,
  confirm_passwordError
) {
  nameError.classList.remove('field-error-active');
  nameError.innerHTML = '';

  cpf_cnpjError.classList.remove('field-error-active');
  cpf_cnpjError.innerHTML = '';

  birthdayError.classList.remove('field-error-active');
  birthdayError.innerHTML = '';

  emailError.classList.remove('field-error-active');
  emailError.innerHTML = '';

  passwordError.classList.remove('field-error-active');
  passwordError.innerHTML = '';

  confirm_passwordError.classList.remove('field-error-active');
  confirm_passwordError.innerHTML = '';
}

function checkFields(
  name,
  cpf_cnpj,
  birthday,
  email,
  password,
  confirm_password
) {
  let nameError = document.getElementById('nameError');
  let cpf_cnpjError = document.getElementById('cpf_cnpjError');
  let birthdayError = document.getElementById('birthdayError');
  let emailError = document.getElementById('emailError');
  let passwordError = document.getElementById('passwordError');
  let confirm_passwordError = document.getElementById('confirm_passwordError');
}

resetFieldsErrors(
  nameError,
  cpf_cnpjError,
  birthdayError,
  emailError,
  passwordError,
  confirm_passwordError
);

let hasError = false;


if(Nome.value === ""){
  hasError = true;
  nameError.innerHTML = 'Preencha o campo nome';
  nameError.classList.add('field-error-active')
}

if(CPF_CNPJ.value === ""){
  hasError = true;
  nameError.innerHTML = 'Preencha o campo cpf/cnpj'
  nameError.classList.add('field-error-active')
}

if(Data_de_nascimento.value === ""){
  hasError = true;
  nameError.innerHTML = 'Preencha o campo data de nascimento'
  nameError.classList.add('field-error-active')
}

if(Email.value === ""){
  hasError = true;
  nameError.innerHTML = 'Preencha o campo e-mail'
  nameError.classList.add('field-error-active')
}

if(password.value === ''){
  hasError = true;
  nameError.innerHTML = 'Preencha o campo senha'
  nameError.classList.add('field-error-active')
}

if (confirm_password.value === '') {
  hasError = true;
  confirm_passwordError.innerHTML = 'Preencha o campo confirmar senha';
  confirm_passwordError.classList.add('field-error-active');

if(
  passowrd !== '' &&
  confirm_password.value !== '' &&
  confirm_password.value !== password.value
){
  hasError = true;
  confirm_passwordError.innerHTML = 'Senha diferentes';
  confirm_passwordError.classList.add('field-error-active')
}
return {hasError};
}

async function cadastrar(){
  const Url = "https://go-wash-api.onrender.com/api/user"
  let Nome = document.getElementById("name").value
  let CPF_CNPJ = document.getElementById("cpf_cnpj").value
  let Data_de_nascimento = document.getElementById("birthday").value
  let Email = document.getElementById("email").value
  let Senha = document.getElementById("password").value
  let Confirmar_Senha = document.getElementById("confirm_password").value
  let terms = document.getElementById("termos").checked

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