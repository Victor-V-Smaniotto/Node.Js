const arquivo = require("./arquivo");

arquivo.criarArquivo("log.txt", "Texto Aurudo");
const conteudo = arquivo.lerArquivo("log.txt");

console.log(conteudo);