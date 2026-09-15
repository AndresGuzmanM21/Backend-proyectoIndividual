let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// CREAR TAREA

function crearTarea(titulo, descripcion, prioridad, fecha) {
  const tarea = {
    titulo: titulo,

    descripcion: descripcion,

    prioridad: prioridad,

    fecha: fecha,

    estado: "Pendiente",
  };

  tareas.push(tarea);

  guardarTareas();

  return tarea;
}

// GUARDAR TAREAS

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// OBTENER TAREAS

function obtenerTareas() {
  return tareas;
}
