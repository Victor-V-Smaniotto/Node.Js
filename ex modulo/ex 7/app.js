const logger = require("./logger");
const fs = require("fs");

logger.registrarLog("Sistema iniciado");
logger.registrarLog("Usuário acessou o sistema");
logger.registrarLog("Sistema encerrado");

const conteudo = fs.readFileSync("logs.txt", "utf8");

console.log(conteudo);