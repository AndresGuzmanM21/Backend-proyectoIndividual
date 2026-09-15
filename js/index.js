document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // ELEMENTOS
  // ==========================================

  const botonNuevaTarea = document.getElementById("btnNuevatarea");

  const modalTarea = document.getElementById("modalTarea");

  const cerrarModal = document.getElementById("cerrarModal");

  const botonCrear = document.getElementById("crearTarea");

  // ==========================================
  // CARGAR TAREAS
  // ==========================================

  mostrarTodasLasTareas();

  actualizarContadores();

  mostrarProximasTareas();

  mostrarFecha();

  // ==========================================
  // ABRIR NUEVA TAREA
  // ==========================================

  botonNuevaTarea.addEventListener("click", function () {
    modalTarea.style.display = "flex";
  });

  // ==========================================
  // CERRAR NUEVA TAREA
  // ==========================================

  cerrarModal.addEventListener("click", function () {
    modalTarea.style.display = "none";
  });

  // ==========================================
  // CERRAR MODAL AFUERA
  // ==========================================

  modalTarea.addEventListener("click", function (evento) {
    if (evento.target === modalTarea) {
      modalTarea.style.display = "none";
    }
  });

  // ==========================================
  // CREAR TAREA
  // ==========================================

  botonCrear.addEventListener("click", function () {
    const titulo = document.getElementById("tituloTarea").value;

    const descripcion = document.getElementById("descripcionTarea").value;

    const prioridad = document.getElementById("prioridadTarea").value;

    const fecha = document.getElementById("fechaTarea").value;

    // COMPROBAR TITULO

    if (titulo === "") {
      alert("Por favor escribe el título de la tarea");

      return;
    }

    // CREAR

    crearTarea(titulo, descripcion, prioridad, fecha);

    // ACTUALIZAR

    mostrarTodasLasTareas();

    actualizarContadores();

    mostrarProximasTareas();

    // LIMPIAR

    document.getElementById("tituloTarea").value = "";

    document.getElementById("descripcionTarea").value = "";

    document.getElementById("prioridadTarea").value = "Alta";

    document.getElementById("fechaTarea").value = "";

    // CERRAR

    modalTarea.style.display = "none";

    alert("Tarea creada correctamente");
  });

  // ==========================================
  // BUSCADOR
  // ==========================================

  const buscador = document.getElementById("buscarTarea");

  buscador.addEventListener("input", function () {
    buscarTareas(buscador.value);
  });

  // ==========================================
  // PANEL
  // ==========================================

  document.getElementById("btnPanel").addEventListener("click", function () {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });

  // ==========================================
  // MIS TAREAS
  // ==========================================

  document
    .getElementById("btnMisTareas")
    .addEventListener("click", function () {
      document.querySelector(".tareas").scrollIntoView({
        behavior: "smooth",
      });
    });

  // ==========================================
  // PROYECTOS
  // ==========================================

  document
    .getElementById("btnProyectos")
    .addEventListener("click", function () {
      document.querySelector(".proyectos").scrollIntoView({
        behavior: "smooth",
      });
    });

  // ==========================================
  // CALENDARIO
  // ==========================================

  document
    .getElementById("btnCalendario")
    .addEventListener("click", function () {
      document.querySelector(".calendario").scrollIntoView({
        behavior: "smooth",
      });
    });

  // ==========================================
  // CONFIGURACION
  // ==========================================

  const botonConfiguracion = document.getElementById("btnConfiguracion");

  const modalConfiguracion = document.getElementById("modalConfiguracion");

  const cerrarConfiguracion = document.getElementById("cerrarConfiguracion");

  const guardarConfiguracion = document.getElementById("guardarConfiguracion");

  botonConfiguracion.addEventListener("click", function () {
    modalConfiguracion.style.display = "flex";
  });

  cerrarConfiguracion.addEventListener("click", function () {
    modalConfiguracion.style.display = "none";
  });

  // GUARDAR CONFIGURACION

  guardarConfiguracion.addEventListener("click", function () {
    const nombre = document.getElementById("nombreUsuario").value;

    const tema = document.getElementById("modoTema").value;

    if (nombre === "") {
      alert("Escribe un nombre");

      return;
    }

    // CAMBIAR NOMBRE

    document.querySelector(".usuario h4").textContent = nombre;

    document.querySelector(".bienvenida h1").textContent =
      "¡Hola, " + nombre + "! 👋";

    document.getElementById("nombrePerfil").textContent = nombre;

    // CAMBIAR TEMA

    if (tema === "gris") {
      document.body.style.background = "#dddddd";
    } else {
      document.body.style.background = "#c3c3e763";
    }

    modalConfiguracion.style.display = "none";

    alert("Configuración guardada");
  });

  // CERRAR CONFIGURACION AFUERA

  modalConfiguracion.addEventListener("click", function (evento) {
    if (evento.target === modalConfiguracion) {
      modalConfiguracion.style.display = "none";
    }
  });

  // ==========================================
  // PERFIL
  // ==========================================

  const botonPerfil = document.getElementById("btnPerfil");

  const modalPerfil = document.getElementById("modalPerfil");

  const cerrarPerfil = document.getElementById("cerrarPerfil");

  const cerrarPerfilBoton = document.getElementById("cerrarPerfilBoton");

  // ABRIR PERFIL

  botonPerfil.addEventListener("click", function () {
    modalPerfil.style.display = "flex";
  });

  // CERRAR PERFIL

  cerrarPerfil.addEventListener("click", function () {
    modalPerfil.style.display = "none";
  });

  cerrarPerfilBoton.addEventListener("click", function () {
    modalPerfil.style.display = "none";
  });

  // CERRAR PERFIL AFUERA

  modalPerfil.addEventListener("click", function (evento) {
    if (evento.target === modalPerfil) {
      modalPerfil.style.display = "none";
    }
  });

  // ==========================================
  // AYUDA
  // ==========================================

  document.getElementById("btnAyuda").addEventListener("click", function () {
    alert("En TaskFlow puedes crear, completar, eliminar y buscar tareas.");
  });
});

// ==================================================
// MOSTRAR TODAS LAS TAREAS
// ==================================================

function mostrarTodasLasTareas() {
  const tabla = document.getElementById("tablaTareas");

  tabla.innerHTML = "";

  const tareasGuardadas = obtenerTareas();

  for (let i = 0; i < tareasGuardadas.length; i++) {
    mostrarTarea(tareasGuardadas[i]);
  }

  if (tareasGuardadas.length === 0) {
    document.getElementById("mensajeTareas").style.display = "block";
  } else {
    document.getElementById("mensajeTareas").style.display = "none";
  }
}

// ==================================================
// MOSTRAR UNA TAREA
// ==================================================

function mostrarTarea(tarea) {
  const tabla = document.getElementById("tablaTareas");

  const fila = document.createElement("tr");

  let fecha = tarea.fecha;

  if (fecha === "") {
    fecha = "Sin fecha";
  }

  let claseEstado = "pendiente";

  if (tarea.estado === "Completada") {
    claseEstado = "completada";
  }

  let botonCompletar = "";

  if (tarea.estado === "Pendiente") {
    botonCompletar = `

      <button
        class="btn-completar"
        onclick="completarTarea(this)"
      >
        Completar
      </button>

    `;
  }

  fila.innerHTML = `

    <td>
      ${tarea.titulo}
    </td>

    <td>
      ${fecha}
    </td>

    <td>

      <span
        class="estado ${claseEstado}"
      >
        ${tarea.estado}
      </span>

    </td>

    <td>

      ${botonCompletar}

      <button
        class="btn-eliminar"
        onclick="eliminarTarea(this)"
      >
        Eliminar
      </button>

    </td>

  `;

  tabla.appendChild(fila);
}

// ==================================================
// COMPLETAR TAREA
// ==================================================

function completarTarea(boton) {
  const fila = boton.parentElement.parentElement;

  const titulo = fila.children[0].textContent.trim();

  const tareasGuardadas = obtenerTareas();

  for (let i = 0; i < tareasGuardadas.length; i++) {
    if (tareasGuardadas[i].titulo === titulo) {
      tareasGuardadas[i].estado = "Completada";

      break;
    }
  }

  guardarTareas();

  mostrarTodasLasTareas();

  actualizarContadores();

  mostrarProximasTareas();
}

// ==================================================
// ELIMINAR TAREA
// ==================================================

function eliminarTarea(boton) {
  const fila = boton.parentElement.parentElement;

  const titulo = fila.children[0].textContent.trim();

  const tareasGuardadas = obtenerTareas();

  for (let i = 0; i < tareasGuardadas.length; i++) {
    if (tareasGuardadas[i].titulo === titulo) {
      tareasGuardadas.splice(i, 1);

      break;
    }
  }

  guardarTareas();

  mostrarTodasLasTareas();

  actualizarContadores();

  mostrarProximasTareas();
}

// ==================================================
// CONTADORES
// ==================================================

function actualizarContadores() {
  const tareasGuardadas = obtenerTareas();

  let total = tareasGuardadas.length;

  let pendientes = 0;

  let completadas = 0;

  for (let i = 0; i < tareasGuardadas.length; i++) {
    if (tareasGuardadas[i].estado === "Pendiente") {
      pendientes++;
    }

    if (tareasGuardadas[i].estado === "Completada") {
      completadas++;
    }
  }

  document.getElementById("totalTareas").textContent = total;

  document.getElementById("tareasPendientes").textContent = pendientes;

  document.getElementById("tareasCompletadas").textContent = completadas;

  document.getElementById("numeroNotificaciones").textContent = pendientes;
}

// ==================================================
// BUSCAR TAREAS
// ==================================================

function buscarTareas(texto) {
  const filas = document
    .getElementById("tablaTareas")
    .getElementsByTagName("tr");

  texto = texto.toLowerCase();

  for (let i = 0; i < filas.length; i++) {
    const nombreTarea = filas[i].children[0].textContent.toLowerCase();

    if (nombreTarea.includes(texto)) {
      filas[i].style.display = "";
    } else {
      filas[i].style.display = "none";
    }
  }
}

// ==================================================
// PROXIMAS TAREAS
// ==================================================

function mostrarProximasTareas() {
  const lista = document.getElementById("listaProximas");

  lista.innerHTML = "";

  const tareasGuardadas = obtenerTareas();

  let cantidad = 0;

  for (let i = 0; i < tareasGuardadas.length; i++) {
    if (tareasGuardadas[i].estado === "Pendiente" && cantidad < 3) {
      const li = document.createElement("li");

      li.textContent = tareasGuardadas[i].titulo;

      lista.appendChild(li);

      cantidad++;
    }
  }

  if (cantidad === 0) {
    const li = document.createElement("li");

    li.textContent = "No hay próximas tareas.";

    lista.appendChild(li);
  }
}

// ==================================================
// FECHA
// ==================================================

function mostrarFecha() {
  const fecha = new Date();

  const opciones = {
    month: "long",

    year: "numeric",
  };

  const fechaTexto = fecha.toLocaleDateString("es-ES", opciones);

  document.getElementById("fechaActual").textContent = fechaTexto;
}
