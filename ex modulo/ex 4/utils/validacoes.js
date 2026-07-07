function validarNumeros(a, b) {
    return typeof a === "number" &&
           typeof b === "number" &&
           !isNaN(a) &&
           !isNaN(b);
}

module.exports = {
    validarNumeros
};