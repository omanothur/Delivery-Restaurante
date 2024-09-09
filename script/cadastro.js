async function cadastrar(){ 
    console.log("aaa")
    const Url="https://go-wash-api.onrender.com/api/user"
    let Nome = document.getElementById("Nome").value
    let CPF_CNPJ = document.getElementById("CPF/CNPJ").value
    let Data_de_nascimeento = document.getElementById("Data de nascimento").value
    let Email = document.getElementById("Email").value
    let Senha = document.getElementById("Senha").value
    let Confirmar_Senha = document.getElementById("Confirmar Senha").value
    let terms = document.getElementById("termos").checked

    if (Senha !== Confirmar_Senha){
        return alert("Senha invalida")
    }

    let dados ={
    "name":Nome,
    "email":Email,
    "user_type_id":1,
    "password": Senha,
    "cpf_cnpj": CPF_CNPJ,
    "terms": terms == true? 1 : 0,
    "birthday":Data_de_nascimeento
    }
    
    const headers = {
        'Content-Type': 'application/json',
      };

      const requisicao = await fetch(Url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(dados),
      });

      const resposta = await requisicao.json();
      console.log(resposta);
}