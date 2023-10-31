const urlViaCep = "https://viacep.com.br/ws/";
const urlViaCepProfessor = "http://172.16.35.155:3000/myceps";
const urlContato = "http://172.16.35.155:3000/contatos";

async function Cadastrar(e) {
    e.preventDefault();
    //Pega os valores dos camposde formulário
    const nome = document.getElementById("nome").value.trim()
    const email = document.getElementById("email").value.trim()
    const telefone = document.getElementById("telefone").value
    const cep = document.getElementById("cep").value
    const rua = document.getElementById("rua").value.trim()
    const numero = document.getElementById("numero").value
    const complemento = document.getElementById("complemento").value
    const bairro = document.getElementById("bairro").value.trim()
    const cidade = document.getElementById("cidade").value.trim()
    const estado = document.getElementById("estado").value.trim()

    objCadastro = {
        nome,
        email,
        telefone,
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado
    }


    try {
        const promise = await fetch(urlContato, {
            body: JSON.stringify(objCadastro),
            method: "post",
            headers: { "Content-type": "application/json" }
        })
        const dados = await promise.json()

        console.log(dados);

    } catch (error) {
        console.log("Erro");
        console.log(error);
    }
}

async function buscarEndereco(cep) {

    try {
        const promise = await fetch(`${urlViaCepProfessor}/${cep}`);
        const endereco = await promise.json();
        console.log(endereco);
        
        preencherCampos({
            logradouro: endereco.logradouro,
            localidade: endereco.localidade,
            uf: endereco.uf,
        });

        document.getElementById("not found").innerText = "";
    } catch (error) {
        document.getElementById("not-found").innerHTML = "cep inválido";
    }
}

function preencherCampos(endereco) {
    document.getElementById("rua").value = endereco.logradouro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;
}