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

  const nombreUsuario = obtenerNombreUsuario()



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
    console.log("consultando el usuario")
    fetch(urlUsuario, settings)
    .then(response => response.json())
    .then(data => {
      // console.log("Nombre de usuario")
      console.log(data)

      //renderizar el nombre del usuario
      const userName = document.querySelector(".user-info p")
      console.log(nombreUsuario)
      userName.textContent = data.firstName + ' ' + data.lastName

    })
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    
    



  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    




  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {







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