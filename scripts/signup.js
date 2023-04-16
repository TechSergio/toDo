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

        //Objeto que me pide la API al momento del lregistro
        const payload = {
            firstName: inputNombre.value,
            lastName: inputApellido.value,
            email: inputEmail.value,
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


});