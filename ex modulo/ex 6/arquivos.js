const fs = require("fs");

function criarArquivo(nome, conteudo){
  fs.writeFileSync(nome, conteudo, "utf8");
}

function lerArquivo(nome){
  return fs.readFileSync(nome, "utf8");
}

module.exports = {
  criarArquivo,
  lerArquivo,
};