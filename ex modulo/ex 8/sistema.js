const os = require("os");

function mostrarInfoSistema() {
    console.log("=== INFORMAÇÕES DO SISTEMA ===");

    console.log("Sistema operacional:", os.platform());
    console.log("Arquitetura:", os.arch());

    const memTotal = os.totalmem() / (1024 * 1024 * 1024);
    const memLivre = os.freemem() / (1024 * 1024 * 1024);

    console.log("Memória total:", memTotal.toFixed(2), "GB");
    console.log("Memória livre:", memLivre.toFixed(2), "GB");
}

module.exports = { mostrarInfoSistema };