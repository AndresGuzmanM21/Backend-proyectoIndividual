# Backend TaskFlow - Java Spring Boot

## Descripción
Backend para la aplicación TaskFlow desarrollado con Java 17 y Spring Boot 3.2.0.

## Tecnologías
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database (base de datos en memoria)
- Maven

## Estructura del Proyecto
```
backend-java/
├── src/main/java/com/taskflow/
│   ├── TaskflowApplication.java      # Clase principal
│   ├── config/
│   │   └── CorsConfig.java           # Configuración CORS
│   ├── controller/
│   │   └── TareaController.java      # Controlador REST
│   ├── model/
│   │   └── Tarea.java                # Modelo de datos
│   ├── repository/
│   │   └── TareaRepository.java      # Repositorio JPA
│   └── service/
│       └── TareaService.java         # Lógica de negocio
└── src/main/resources/
    ├── application.properties        # Configuración
    └── data.sql                      # Datos iniciales
```

## Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/tareas | Obtener todas las tareas |
| GET | /api/tareas/{id} | Obtener tarea por ID |
| POST | /api/tareas | Crear nueva tarea |
| PUT | /api/tareas/{id} | Actualizar tarea |
| DELETE | /api/tareas/{id} | Eliminar tarea |
| GET | /api/tareas/buscar?titulo= | Buscar tareas por título |
| GET | /api/tareas/estadisticas | Obtener estadísticas |

## Ejecutar el Proyecto

### Requisitos previos
- Java 17 o superior
- Maven

### Pasos
1. Abrir terminal en la carpeta del proyecto
2. Ejecutar:
   ```bash
   mvn spring-boot:run
   ```
3. El servidor estará disponible en: http://localhost:8080

### Console H2
- URL: http://localhost:8080/h2-console
- JDBC URL: jdbc:h2:mem:taskflowdb
- User: sa
- Password: (vacío)

## Ejemplos de Peticiones

### Crear tarea
```json
POST /api/tareas
{
  "titulo": "Nueva tarea",
  "descripcion": "Descripción de la tarea",
  "prioridad": "Alta",
  "fecha": "2026-09-25"
}
```

### Actualizar tarea
```json
PUT /api/tareas/1
{
  "titulo": "Tarea actualizada",
  "descripcion": "Nueva descripción",
  "prioridad": "Media",
  "fecha": "2026-09-26",
  "estado": "Completada"
}
```

## Conectar con el Frontend
Para conectar el frontend con este backend, modifica las funciones en taskManager.js para usar fetch() y consumir la API REST en lugar de localStorage.
