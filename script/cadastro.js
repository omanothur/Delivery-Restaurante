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
  let confirm_passwordError = document.getElementById('confirm_passwordError')
  let submitButton = document.getElementById('submitButton');

resetFieldsErrors(
  nameError,
  cpf_cnpjError,
  birthdayError,
  emailError,
  passwordError,
  confirm_passwordError
);

let hasError = false;


if(name.value === ""){
  hasError = true;
  nameError.innerHTML = 'Preencha o campo nome';
  nameError.classList.add('field-error-active')
}

if(cpf_cnpj.value === ""){
  console.log("aqui")
  hasError = true;
  cpf_cnpjError.innerHTML = 'Preencha o campo cpf/cnpj'
  cpf_cnpjError.classList.add('field-error-active')
}

if(birthday.value === ""){
  hasError = true;
  birthdayError.innerHTML = 'Preencha o campo data de nascimento'
  birthdayError.classList.add('field-error-active')
}

if(email.value === ""){
  hasError = true;
  emailError.innerHTML = 'Preencha o campo e-mail'
  emailError.classList.add('field-error-active')
}

if(password.value === ''){
  hasError = true;
  passwordError.innerHTML = 'Preencha o campo senha'
  passwordError.classList.add('field-error-active')
}

if (confirm_password.value === '') {
  hasError = true;
  confirm_passwordError.innerHTML = 'Preencha o campo confirmar senha';
  confirm_passwordError.classList.add('field-error-active');
}

if(
  password !== '' &&
  confirm_password.value !== '' &&
  confirm_password.value !== password.value
){
  hasError = true;
  confirm_passwordError.innerHTML = 'As senhas digitadas não coincidem';
  confirm_passwordError.classList.add('field-error-active')
}
return {hasError};
}


async function cadastrar(){
  const Url = "https://go-wash-api.onrender.com/api/user"
  let Nome = document.getElementById("name")
  let CPF_CNPJ = document.getElementById("cpf_cnpj")
  let Data_de_nascimento = document.getElementById("birthday")
  let Email = document.getElementById("email")
  let Senha = document.getElementById("password")
  let Confirmar_Senha = document.getElementById("confirm_password")
  let terms = document.getElementById("termos").checked

  const fieldErrors = checkFields(
    Nome,
    CPF_CNPJ,
    Data_de_nascimento,
    Email,
    Senha,
    Confirmar_Senha
  )

  if(fieldErrors.hasError){
    return
  }

  let dados = {
    "name": Nome.value,
    "email": Email.value,
    "user_type_id": 1,
    "password": Senha.value,
    "cpf_cnpj": CPF_CNPJ.value,
    "terms": terms == true ? 1 : 0,
    "birthday": Data_de_nascimento.value
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