const usu = require("./usuarios");

usu.criarUsuario("Ana", 25);
usu.criarUsuario("Bumbum", 39);
usu.criarUsuario("Pintonaldo", 10);

console.log("Lista:");
console.log(usu.listarUsuarios());