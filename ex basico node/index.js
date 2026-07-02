// const x = Number(process.argv[2]);
// const y = Number(process.argv[3]);

// const soma = x + y;
// const subtracao = x - y;
// const multiplicacao = x * y;
// const divisao = x / y;
// console.log("Soma:", soma);
// console.log("Sbtracao:", subtracao);
// console.log("mult:", multiplicacao);
// console.log("div:", divisao);


// const idade = Number(process.argv[2]);
// if(idade >= 18){
//     console.log("Idoso");
// } else {
//     console.log("bebe");
// }

// const nivel = Number(process.argv[2]);
//   if(nivel >= 1 && nivel <= 10){
//     console.log("iniciante");
//  } else if (nivel >= 11 && nivel <= 20 ){
//     console.log("intermediario");
//  } else{
//     console.log("Avancado");
//  }

// const nivel = Number(process.argv[2]);
// const XP = nivel * 100;
// console.log(`Nivel: ${nivel} Xp necessario para o proximo nivel: ${XP}`)

// const nomeItem = process.argv[2];
// const preco = Number(process.argv[3]);
// const ouro = Number(process.argv[4]);

// if(ouro >= preco){
//     console.log("Voce comprou o item", nomeItem);
//     console.log("Ouro restante:", ouro - preco);
// } else{
//     X = preco - ouro;
//     console.log(`Ouro insuficiente! Faltam ${X} de ouro.`)
// }

// const celsius = Number(process.argv[2]);
// const Fahrenheit = (celsius * 9/5) + 32;
// console.log("Fierenait: ", Fahrenheit);
// const Kelvin = celsius + 273.15;
// console.log("Kelvin: ", Kelvin);

// const ataque = Number(process.argv[2]);
// const defesa = Number(process.argv[3]);
// let dano = ataque - defesa;
// if (dano < 0){
//     dano == 0;
//     console.log("voce nao recebeu dano");
// } else {
//     console.log("recebeu", dano);
// }

// const opcao = process.argv[2];
// switch (opcao){
//     case "ataque":
//         console.log("voce atacou");
//         break;
//     case "fugir":
//         console.log("voce fugir");
//         break;
//     case "defender":
//         console.log("voce se defender");
//         break;
//     case "inventario":
//         console.log("voce abriu o inventario");
//         break;
//     default: 
//         console.log("Valor invalido");
// }

// const nome = process.argv[2];
// const classe = process.argv[3];
// const nivel = Number(process.argv[4]);
// let rank;
// if(nivel >= 1 && nivel <= 10){
//     rank = "But vulgo recrutinha";
//  } else if (nivel >= 11 && nivel <= 20 ){
//     rank = "Normal vulgo meio ruim";
//  } else{
//     rank = "Expert vulgo farmador de aura";
//  }
// console.log(`===== Cadastro de Agente =====
// Nome: ${nome}
// Classe: ${classe}
// Nível:  ${nivel}
// Rank:   ${rank}
// ==============================`)