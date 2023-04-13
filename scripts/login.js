window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector("form")
    const inputEmail = document.querySelector("#inputEmail")
    const inputPassword = document.querySelector("#inputPassword")

    //variable donde almacenaremos el endpoint base url 
    const URL = "https://todo-api.ctd.academy/v1"




    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault()

        //Objeto que me pide la API al momento del logueo
        const payload = {
            email: inputEmail.value,
            password: inputPassword.value,
        }

        //definimos la configuracion del fetch
        const settings = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }

        }

        //Usamos la funcion que hara uso del fetch
        realizarLogin(settings)
        form.reset()

        



    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {

        console.log("lanzando la consulta a la api....")
        fetch(`${URL}/users/login`, settings)
        .then(response => {
            console.log(response)
            //Si la respuesta no es ok, alguno de los datos es erroneo
            if (response.ok!=true){
                alert("Algun dato es incorrecto")
            }
            return response.json()
        })
        .then(data =>{
            console.log("La promesa se cumplio")
            console.log(data)
            
            //Si el servidor respondio con el token....
            if (data.jwt){
                console.log(data)
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