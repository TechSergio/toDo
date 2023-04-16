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
    fetch(urlUsuario, settings)
    .then(response => response.json())
    .then(data => {
      //renderizar el nombre del usuario
      const userName = document.querySelector(".user-info p")
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
    
    fetch( urlTareas, settings)
    .then( response => response.json() )
    .then( data => {
      renderizarTareas(data)
      botonBorrarTarea()
      botonesCambioEstado()

      });

  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault()
    //el payload
    const payload = {
        description: nuevaTarea.value.trim(),
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
      if (response.ok != true){
          alert("Algun dato es incorrecto")
      }
      return response.json()
    })
    .then(data => {
        //Si el servidor respondio con el token....
      consultarTareas()
      })
      .catch(error => console.log(error))

      formCrearTarea.reset()

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

    //Contador que aparece en tareas finalizadas
    const numeroFinalizadas = document.querySelector("#cantidad-finalizadas") 
    let contador = 0

    //Renderizacion de cada tarea incompleta.
      listado.forEach(tarea => {
        let fecha = new Date (tarea.createdAt)
        if (!tarea.completed){
          cajaTareasPendientes.innerHTML += `
          <li class="tarea">
            <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <p class="timestamp">${fecha.toLocaleDateString()}</p>
            </div>
          </li>` 
        }else {
          contador++
          numeroFinalizadas.innerText = contador
          cajaTareasTerminadas.innerHTML += `
          <li class="tarea">
            <div class="hecha">
            <i class="fa regular fa-circle-check"></i>
            </div>
            <div class="descripcion">
              <p class="nombre">${tarea.description}</p>
              <div class="cambios-estados">
                <button class="change completa" id="${tarea.id}"><i class="fa-solid fa-rotate-left"></i></button>
                <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </li>` 
        }
        
      })
      numeroFinalizadas.innerText = contador

  };



  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    const btnCambioEstado = document.querySelectorAll(".change")
    
    btnCambioEstado.forEach(boton => {

      boton.addEventListener("click", event => {

        const id = event.target.id
        const url = `${urlTareas}${id}`
        const payload = {}
        
        //segun el boton que fue clickeado, cambiamos el estado de la tarea
        if (event.target.classList.contains("completa")){
          //si esta completa la paso a pendiente
          payload.completed = false
        }else {
          //si no esta completa la paso a completada
          payload.completed = true
        }
    
        const settings = {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          }
        }
    
        fetch(url, settings)
        .then(response => {
          consultarTareas()
        })

      })
      


    })
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
    const btnBorrarTarea = document.querySelectorAll(".borrar")
    
    btnBorrarTarea.forEach( boton => {
      boton.addEventListener("click", event => {

        const id = event.target.id
        const url = `${urlTareas}${id}`

        const settings ={
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            authorization:token,
          }
        }

        fetch(url, settings)
        .then(response => {
          consultarTareas()
        })

      })
    })

    

  };

});