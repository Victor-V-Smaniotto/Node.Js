function validarNome(nome){
    if(nome.length > 3){
        return `Nome: ${nome}`;
    }
    else{
        return `N dá`;
    }
}

function validarIdade(idade){
    if(idade < 0){
        return `Sua idade não vai`;
    }
    else{
        return `Sua idade é ${idade}`;
    }
}

module.exports = {
    validarNome,
    validarIdade
}