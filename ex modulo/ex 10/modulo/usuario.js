const fs = require("fs");

function salvarUser(usuario){
    fs.writeFileSync(
        "usuarios.json",
        JSON.stringify(usuario),
        "utf8"
    );
}

module.exports = {
    salvarUser,
};