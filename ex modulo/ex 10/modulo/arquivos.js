function validarNome(nome) {
    return nome.length >= 3;
}

function validarIdade(idade) {
    return idade >= 0;
}

const usuarios = [];

function criarUsuario(nome, idade) {
  const usuario = { nome, idade };
  usuarios.push(usuario);
  return usuario;
}

function listarUsuarios() {
  return usuarios;
}

function excluirUsuario(nomeEx) {
  const index = usuarios.findIndex(usuario => usuario.nome === nomeEx);

  if (index !== -1) {
      usuarios.splice(index, 1);
      return true;
  }

  return false;
}

module.exports = {
    validarNome,
    validarIdade,
    criarUsuario,
    listarUsuarios,
    excluirUsuario
};