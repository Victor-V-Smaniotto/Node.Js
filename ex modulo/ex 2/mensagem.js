function boaVinda(nome){
    return `Bem-vindo: ${nome}`;
};

function despedir(nome){
    return `Adeus: ${nome}`;
};

const autorSistema = "eu";

module.exports = {
    boaVinda,
    despedir,
    autorSistema
}