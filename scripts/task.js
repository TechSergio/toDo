// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
  if (!localStorage.jwt){
    location.replace("./index.html")
  }
  


/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const urlTareas = "https://todo-api.ctd.academy/v1/tasks/"
  const urlUsuario = "https://todo-api.ctd.academy/v1/users/getMe"
  const token = JSON.parse(localStorage.jwt)

  const btnCerrarSesion = document.querySelector("#closeApp")
  const formCrearTarea  = document.querySelector(".nueva-tarea")
  const nuevaTarea = document.querySelector("#nuevaTarea")

  obtenerNombreUsuario()
  consultarTareas()



  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    const cerrarSesion =  confirm("Quiere cerrar sesion?")
    if (cerrarSesion) {
      location.replace("./index.html")
      localStorage.clear()
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    //configuramos el setting de la peticion
    const settings = {
      method: "GET",
      headers: {
        authorization: token,
      }
    }
    // console.log("consultando el usuario")
    fetch(urlUsuario, settings)
    .then(response => response.json())
    .then(data => {
      // console.log("Nombre de usuario")
      console.log(data)

      //renderizar el nombre del usuario
      const userName = document.querySelector(".user-info p")
      // console.log(nombreUsuario)
      userName.textContent = data.firstName + ' ' + data.lastName

    })
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    //configurando el settings
    const settings = {
      method: "GET",
      headers: {
        authorization: token,
      }
    }

    console.log("Consultando el usuario...")
    
    fetch( urlTareas, settings)
    .then( response => response.json() )
    .then( data => {
      console.log("se obtuvierton los datos")
      console.table(data)
      renderizarTareas(data)
      //botonBorrarTarea()
      //botonesCambioEstado()

      });

  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault()
    //el payload
    const payload = {
        description: nuevaTarea.value,
        completed: false
    }

    //configurando el settings
    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      }
    }
    
    fetch( urlTareas, settings)
    .then(response =>{
      console.log(response)
      if (response.ok != true){
          alert("Algun dato es incorrecto")
      }
      return response.json()
    })
    .then(data => {
      console.log("La promesa se cumplio")
      console.log(data)
                  //Si el servidor respondio con el token....
      consultarTareas()
      })

  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    const cajaTareasPendientes = document.querySelector(".tareas-pendientes")
    const cajaTareasTerminadas = document.querySelector(".tareas-terminadas")
    //Se formatea la seccion de listas para que no se dupliquen
    cajaTareasPendientes.innerHTML = ""
    cajaTareasTerminadas.innerHTML = ""
      listado.forEach(tarea => {
        if (!tarea.completed){
          console.log("tarea incompleta")
          cajaTareasPendientes.innerHTML += `<li class="tarea"><p class="nombre">${tarea.description}</p></li>` 
        }else {
          console.log("tarea completa")
          cajaTareasTerminadas.innerHTML += `<li >${tarea.description}</li>` 
        }
        
      })





  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };

});