function resetFieldsErrors(
  cepError,
  enderecoError,
  numeroError,
  nameError
) {

  cepError.classList.remove('field-error-active');
  cepError.innerHTML = '';

  enderecoError.classList.remove('field-error-active');
  enderecoError.innerHTML = '';

  numeroError.classList.remove('field-error-active');
  numeroError.innerHTML = '';

  nameError.classList.remove('field-error-active');
  nameError.innerHTML = '';

}

function checkFields(
  name,
  cep,
  endereco,
  numero
) {
  let cepError = document.getElementById('cepError');
  let enderecoError = document.getElementById('enderecoError');
  let numeroError = document.getElementById('numeroError');
  let nameError = document.getElementById('nameError');
  let submitButton = document.getElementById('submitButton');

  resetFieldsErrors(
    cepError,
    enderecoError,
    numeroError,
    nameError
  );

  let hasError = false;

  if (name.value === "") {
    hasError = true;
    nameError.innerHTML = 'Preencha o campo nome';
    nameError.classList.add('field-error-active')
  }

  if (cep.value === "") {
    hasError = true;
    cepError.innerHTML = 'Preencha o campo CEP';
    cepError.classList.add('field-error-active')
  }

  if (endereco.value === "") {
    hasError = true;
    enderecoError.innerHTML = 'Preencha o campo endereço'
    enderecoError.classList.add('field-error-active')
  }

  if (numero.value === "") {
    hasError = true;
    numeroError.innerHTML = 'Preencha o campo número'
    numeroError.classList.add('field-error-active')
  }
  return { hasError };
}


async function cadastrar_endereco() {
  const Url = "https://go-wash-api.onrender.com/api/auth/address"
  let Name = document.getElementById("name")
  let Cep = document.getElementById("cep")
  let Endereco = document.getElementById("endereco")
  let Numero = document.getElementById("numero")
  let Complemento = document.getElementById("complemento")
  const fieldErrors = checkFields(
    Name,
    Cep,
    Endereco,
    Numero,
    Complemento
  )
  

  if (fieldErrors.hasError) {
    return
  }

  let dados = {
    "title": Name.value,
    "cep": Cep.value,
    "address": Endereco.value,
    "number": Numero.value,
    "complement": Complemento.value || undefined
  }


  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
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

  if (requisicao.ok) {
    alert("Endereço cadastrado com sucesso!")
  } else {
    if (requisicao.status === 500) {
      return alert("Erro ao realizar seu cadastro! Tente novamente mais tarde.")
    }
  }
}

function showForm() {
  const form = document.getElementById('myForm');
  form.classList.add('show');
}
