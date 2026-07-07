const { montarCaminho } = require("./caminhos");

const caminho1 = montarCaminho("arquivo1.txt");
const caminho2 = montarCaminho("dados.json");
const caminho3 = montarCaminho("relatorio.pdf");

console.log("Caminhos:");
console.log(caminho1);
console.log(caminho2);
console.log(caminho3);