window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    form = document.querySelector("form")
    const inputNombre = document.querySelector("#inputNombre")
    const inputApellido = document.querySelector("#inputApellido")
    const inputEmail = document.querySelector("#inputEmail")
    const inputPassword = document.querySelector("#inputPassword")
    const inputPasswordRepetida = document.querySelector("#inputPasswordRepetida")

    //variable donde almacenaremos el endpoint base url 
    const URL = "https://todo-api.ctd.academy/v1"

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()

        //caja de errores
        const cajaErrores = document.querySelector("#errores")

        //evita el duplicado de la caja
        if (cajaErrores){
            cajaErrores.remove()
        }

        let errores = []

        /* ---------------------- Validaciones---------------------- */ 
        if (!validarTexto(inputNombre.value)) {
            errores.push("El nombre debe tener entre 3 y 50 caracteres, y no tener caracteres especiales")
        }

        if (!validarTexto(inputApellido.value)) {
            errores.push("El Apellido debe tener entre 3 y 50 caracteres, y no tener caracteres especiales")
        }

        if (!validarEmail(inputEmail.value)){
            errores.push("El email no tiene el formato correcto Ej: nombre@dominio.com")
        }

        if (!validarContrasenia(inputPassword.value)){
            errores.push("La contrasenias debe contener tener mas de 10 caracteres")
        }

        if (!compararContrasenias(inputPassword.value, inputPasswordRepetida.value)){
            errores.push("Las contrasenias deben coincidir")
        }

        /* ---------------------- Comprueba que existan errores antes del envio---------------------- */ 
        if (errores.length == 0){
            //Se normalizan los datos antes de enviarlos
            const payload = {
                firstName: normalizarTexto(inputNombre.value),
                lastName: normalizarTexto(inputApellido.value),
                email: normalizarEmail(inputEmail.value),
                password: inputPassword.value
            }

            //definimos la configuracion del fetch
            const settings = {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            realizarRegister(settings)
            form.reset
        } else {
            //crear caja de error
            renderizarErrores(errores)
            
            
        }

    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {

        fetch(`${URL}/users`, settings)
        .then(response =>{
            if (response.ok != true){
                alert("Algun dato es incorrecto")
            }
            return response.json()
        })
        .then(data => {
            //Si el servidor respondio con el token....
            if (data.jwt){
                localStorage.setItem("jwt",JSON.stringify(data.jwt));
                location.replace("./mis-tareas.html")
            }
        })
        .catch(err => {
            console.log("Promesa rechazada")
            console.log(err)
        })



    };


    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN EXTRA: Renderizar errores                    */
    /* -------------------------------------------------------------------------- */
    function renderizarErrores(lista){
        const divTemplate = document.createElement("div")
        divTemplate.setAttribute("id", "errores")
        divTemplate.style ="padding: .5em 1em; color: rgb(226, 232, 24); margin: .5em 0 "
        
        lista.forEach(error => {
            divTemplate.innerHTML += `
            <p><i class="fa-solid fa-circle-exclamation" style="color: #d52020;"></i> <small>${error}</small> </p><br>
            `
        })
        form.appendChild(divTemplate)
    }

});

