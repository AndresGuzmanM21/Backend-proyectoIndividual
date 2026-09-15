package com.taskflow.controller;

import com.taskflow.model.Tarea;
import com.taskflow.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "*")
public class TareaController {
    
    @Autowired
    private TareaService tareaService;
    
    @GetMapping
    public List<Tarea> obtenerTodas() {
        return tareaService.obtenerTodas();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Tarea> obtenerPorId(@PathVariable Long id) {
        return tareaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Tarea crear(@RequestBody Tarea tarea) {
        return tareaService.crear(tarea);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Tarea> actualizar(@PathVariable Long id, @RequestBody Tarea tarea) {
        Tarea tareaActualizada = tareaService.actualizar(id, tarea);
        
        if (tareaActualizada != null) {
            return ResponseEntity.ok(tareaActualizada);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (tareaService.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/buscar")
    public List<Tarea> buscar(@RequestParam String titulo) {
        return tareaService.buscarPorTitulo(titulo);
    }
    
    @GetMapping("/estadisticas")
    public Map<String, Long> obtenerEstadisticas() {
        long total = tareaService.obtenerTodas().size();
        long pendientes = tareaService.contarPorEstado("Pendiente");
        long completadas = tareaService.contarPorEstado("Completada");
        
        return Map.of(
            "total", total,
            "pendientes", pendientes,
            "completadas", completadas
        );
    }
}
