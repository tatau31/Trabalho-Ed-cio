const prompt = require("prompt-sync")()
const fs = require("fs")

//Vetores
const videogames = []
const marca = [] 
const preco = []

//Função 1
function incluir(){
    const a = prompt("Adicione um Console a sua coleção: ")
    const b = prompt("Marca do Console: ")
    const c = prompt("preço do console: ")

    videogames.push(a)
    marca.push(b)
    preco.push(c)
    
    console.log("Nice aquisição")   
}

//Função 2
function listar(){
    console.log("==================\n")
    console.log("Lista de consoles: ")
    
    console.log("\nModelo.............: Marca.........: Preço R$:")

    for (let i = 0; i < videogames.length; i++){
        console.log(`${(i+1)} ...... ${videogames[i]} ..... ${marca[i]} ..... ${preco[i]}`)
    }

    
}

//Função 3
function pesq__marca(){
    console.log("==================\n")
    console.log("Lista por marca: ")
    
    const pesq = prompt("Marca do console: ")

    console.log("\nModelo.............: Marca.........: Preço R$:")
    
    let contador = 0
    for(let i = 0; i < videogames.length; i++){
        if(marca[i].toUpperCase() == pesq.toUpperCase()){
            console.log(`${(i+1)} ...... ${videogames[i]} ..... ${marca[i]} ..... ${preco[i]}`)
            contador = contador + 1
        }
    }
    if(contador == 0){
        console.log("Você não possue nenhum console desta marca em sua coleção")
    }
}

//Função 4
function pesq__preco(){
    console.log("==================\n")
    console.log("Lista por preço: ")
    
    const preco1 = Number(prompt("Valor Minimo:"))
    const preco2 = Number(prompt("Valor Maximo:"))

    console.log("\nModelo.............: Marca.........: Preço R$:")
    
    let contador = 0
    for(let i = 0; i < videogames.length; i++){
        if(preco[i] >= preco1 && preco[i] <= preco2){
            console.log(`${(i+1)} ...... ${videogames[i]} ..... ${marca[i]} ..... ${preco[i]}`)
            contador = contador + 1
        }
    }   
        if(contador == 0){
            console.log("Você não possue nenhum console nesta faixa de preço")
    }
}

//Função 5
function alteraDados(){
    console.log("==================\n")
    console.log("Alterar dados")

    listar();

    const opcao = Number(prompt("Digite o número do console que deseja alterar: ")) - 1

    if (opcao < 0 || opcao >= videogames.length) {
        console.log("Numero invalido")
        return
    }


    const novoModelo = prompt("Novo modelo do console: ")
    const novaMarca = prompt("Nova marca do console: ")
    const novoPreco = prompt("Novo preço do console: ")

    videogames[opcao] = novoModelo;
    marca[opcao] = novaMarca;
    preco[opcao] = novoPreco;

    console.log("Dados do console alterados com sucesso")

}

//Função 6
function exluirDados(){
    console.log("==================\n");
    console.log("Alterar dados");

    listar()

    const opcao = Number(prompt("Digite o número do console que deseja excluir: ")) - 1

    if (opcao < 0 || opcao >= videogames.length) {
        console.log("Numero invalido")
        return;
    }

    videogames.splice(opcao, 1)
    marca.splice(opcao, 1)
    preco.splice(opcao, 1)

}

//Função Salvar
function gravaDados(){
    const colecao = []
    for(let i = 0; i < videogames.length; i++){
        colecao.push(videogames[i]+";"+marca[i]+";"+preco[i])
    }
    fs.writeFileSync("dados/colecao.txt", colecao.join("\n"))

    console.log("Dados Salvos Com Exito")
}

//Função Carregar
function carregaDados(){
    if (fs.existsSync("dados/colecao.txt")){
        const colecao = fs.readFileSync("dados/colecao.txt", "utf8").split("\n")

        for(let i = 0; i < colecao.length; i++){
            const partes = colecao[i].split(";")

            videogames.push(partes[0])
            marca.push(partes[1])
            preco.push(Number(partes[2]))
        }
    }
}

carregaDados()

do{
    console.log("=================================\n")
    console.log("Funão 1 - Incluir Console ")
    console.log("Função 2 - Mostrar Coleção ")
    console.log("Função 3 - Pesquisar por marca ")
    console.log("Função 4 - Pesquisar por Intervalo de preço ")
    console.log("Função 5 - Alterar item da coleção ")
    console.log("Funçaõ 6 - Excluir Item ")
    console.log("Função 7 - Finalizar ")
    const funcao = Number(prompt("Oque deseja fazer? "))

    if(funcao == 1){
        incluir()
    }
    if(funcao == 2){
        listar()
    }
    if(funcao == 3){
        pesq__marca()
    }
    if(funcao == 4){
        pesq__preco()
    }
    if(funcao == 5){
        alteraDados()
    }
    if(funcao == 6){
        exluirDados()
    }
    if(funcao == 7){
        break
    }
} while(true)

gravaDados()