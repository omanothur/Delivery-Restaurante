function checkFields() {
  let name = document.getElementById('name');
  let cpf_cnpj = document.getElementById('cpf_cnpj');
  let birthday = document.getElementById('birthday');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let confirm_password = document.getElementById('confirm_password');

  let nameError = document.getElementById('nameError');
  let cpf_cnpjError = document.getElementById('cpf_cnpjError');
  let birthdayError = document.getElementById('birthdayError');
  let emailError = document.getElementById('emailError');
  let passwordError = document.getElementById('passwordError');
  let confirm_passwordError = document.getElementById('confirm_passwordError');

  let hasError = false;

  if (name.value === '') {
    hasError = true;
    name.classList.add('error');

    nameError.innerHTML = 'Preencha o campo nome';
    nameError.classList.add('field-error-active');
  }

  if (cpf_cnpj.value === '') {
    hasError = true;
    cpf_cnpj.classList.add('error');

    cpf_cnpjError.innerHTML = 'Preencha o campo cpf/cnpj';
    cpf_cnpjError.classList.add('field-error-active');
  }

  if (birthday.value === '') {
    hasError = true;
    birthday.classList.add('error');

    birthdayError.innerHTML = 'Preencha o campo data de nascimento';
    birthdayError.classList.add('field-error-active');
  }

  if (email.value === '') {
    hasError = true;
    email.classList.add('error');

    emailError.innerHTML = 'Preencha o campo email';
    emailError.classList.add('field-error-active');
  }

  if (password.value === '') {
    hasError = true;
    password.classList.add('error');

    passwordError.innerHTML = 'Preencha o campo senha';
    passwordError.classList.add('field-error-active');
  }

  if (confirm_password.value === '') {
    hasError = true;
    confirm_password.classList.add('error');

    confirm_passwordError.innerHTML = 'Preencha o campo confirmar senha';
    confirm_passwordError.classList.add('field-error-active');
  }

  if (
    password !== '' &&
    confirm_password.value !== '' &&
    confirm_password.value !== password.value
  ) {
    hasError = true;
    confirm_password.classList.add('error');

    confirm_passwordError.innerHTML = 'Senhas diferentes';
    confirm_passwordError.classList.add('field-error-active');
  }

  return { hasError };
}

async function cadastrar() {
  const Url = 'https://go-wash-api.onrender.com/api/user';
  let name = document.getElementById('name').value;
  let cpf_cnpj = document.getElementById('cpf_cnpj').value;
  let birthday = document.getElementById('birthday').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let terms = document.getElementById('termos').checked;

  const fieldsErrors = checkFields();

  if (fieldsErrors.hasError) {
    return;
  }

  let dados = {
    name: name,
    email: email,
    user_type_id: 1,
    password: password,
    cpf_cnpj: cpf_cnpj,
    terms: terms == true ? 1 : 0,
    birthday: birthday,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  const requisicao = await fetch(Url, {
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

    if ('email' in resposta.data.errors) {
      return alert(resposta.data.errors.email);
    }

    if ('cpf_cnpj' in resposta.data.errors) {
      return alert(resposta.data.errors.cpf_cnpj);
    }
  }
}
