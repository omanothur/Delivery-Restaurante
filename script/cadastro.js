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

  resetFieldsErrors(
    nameError,
    cpf_cnpjError,
    birthdayError,
    emailError,
    passwordError,
    confirm_passwordError
  );

  let hasError = false;

  if (name.value === '') {
    hasError = true;

    nameError.innerHTML = 'Preencha o campo nome';
    nameError.classList.add('field-error-active');
  }

  if (cpf_cnpj.value === '') {
    hasError = true;

    cpf_cnpjError.innerHTML = 'Preencha o campo cpf/cnpj';
    cpf_cnpjError.classList.add('field-error-active');
  }

  if (birthday.value === '') {
    hasError = true;

    birthdayError.innerHTML = 'Preencha o campo data de nascimento';
    birthdayError.classList.add('field-error-active');
  }

  if (email.value === '') {
    hasError = true;

    emailError.innerHTML = 'Preencha o campo email';
    emailError.classList.add('field-error-active');
  }

  if (password.value === '') {
    hasError = true;

    passwordError.innerHTML = 'Preencha o campo senha';
    passwordError.classList.add('field-error-active');
  }

  if (confirm_password.value === '') {
    hasError = true;

    confirm_passwordError.innerHTML = 'Preencha o campo confirmar senha';
    confirm_passwordError.classList.add('field-error-active');
  }

  if (
    password !== '' &&
    confirm_password.value !== '' &&
    confirm_password.value !== password.value
  ) {
    hasError = true;

    confirm_passwordError.innerHTML = 'Senhas diferentes';
    confirm_passwordError.classList.add('field-error-active');
  }

  return { hasError };
}

async function cadastrar() {
  const url = 'https://go-wash-api.onrender.com/api/user';
  let name = document.getElementById('name');
  let cpf_cnpj = document.getElementById('cpf_cnpj');
  let birthday = document.getElementById('birthday');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let confirm_password = document.getElementById('confirm_password');
  let terms = document.getElementById('termos').checked;

  const fieldsErrors = checkFields(
    name,
    cpf_cnpj,
    birthday,
    email,
    password,
    confirm_password
  );

  if (fieldsErrors.hasError) {
    return;
  }

  let dados = {
    name: name.value,
    email: email.value,
    user_type_id: 1,
    password: password.value,
    cpf_cnpj: cpf_cnpj.value,
    terms: terms == true ? 1 : 0,
    birthday: birthday.value,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  const requisicao = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(dados),
  });

  if (requisicao.ok) {
    const resposta = await requisicao.json();
    alert(resposta.data);
  } else {
    if (requisicao.status === 500) {
      return alert(
        'Erro ao realizar seu cadastro! Tente novamente mais tarde.'
      );
    }
    const resposta = await requisicao.json();

    const errors = resposta.data.errors;

    if (errors === 'cpf_cnpj invalid') {
      return alert('CPF/CNPJ inválido');
    }
    if ('email' in errors) {
      return alert(resposta.data.errors.email);
    }
  }
}
