/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
    //Se valida que el texto sean solo caracteres y no se haga uso de simbolos o numeros

    //Permite caracteres alfanumericos, minusculas, mayusculas, acentos y enies,
    // longitud minima 3 y max 50, un espacio opcional luego de cada palabra
    const expRegular = /^([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]{3,50}\s?)+$/

    if (expRegular.test(texto)){
        return true
    }

    return false
}

function normalizarTexto(texto) {
    //Pasar formato de texto al correcto, empezando con mayuscula y continuando con minuscula
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    const expRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (expRegular.test(email)){
        return true
    }
    return false
    
}

function normalizarEmail(email) {
    return email.toUpperCase()
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    if (contrasenia.length < 10){
        return false
    }
    return true
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    if (contrasenia_1 === contrasenia_2){
        return true
    }
    return false
}

