const fs = require("fs");

function registrarLog(mensagem) {
  const agora = new Date().toISOString().replace("T", " ").split(".")[0];
  const linha = `[${agora}] ${mensagem}\n`;

  fs.appendFileSync("logs.txt", linha, "utf8");
}

module.exports = {
  registrarLog,
};