const operacoes = require("./operacoes");
const validacoes = require("./validacoes");

const numero1 = 20;
const numero2 = 2;

if (validacoes.validarNumeros(numero1, numero2)) {
    console.log("Soma:", operacoes.somar(numero1, numero2));
    console.log("Subtração:", operacoes.subtrair(numero1, numero2));
    console.log("Multiplicação:", operacoes.multiplicar(numero1, numero2));
    console.log("Divisão:", operacoes.dividir(numero1, numero2));
} else {
    console.log("Erro: um ou ambos os valores não são números.");
}