const path = require("path");

function montarCaminho(nomeArquivo) {
  return path.join(__dirname, nomeArquivo);
}

module.exports = { montarCaminho };