package com.taskflow.service;

import com.taskflow.model.Tarea;
import com.taskflow.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TareaService {
    
    @Autowired
    private TareaRepository tareaRepository;
    
    public List<Tarea> obtenerTodas() {
        return tareaRepository.findAll();
    }
    
    public Optional<Tarea> obtenerPorId(Long id) {
        return tareaRepository.findById(id);
    }
    
    public Tarea crear(Tarea tarea) {
        return tareaRepository.save(tarea);
    }
    
    public Tarea actualizar(Long id, Tarea tareaActualizada) {
        Optional<Tarea> tareaExistente = tareaRepository.findById(id);
        
        if (tareaExistente.isPresent()) {
            Tarea tarea = tareaExistente.get();
            tarea.setTitulo(tareaActualizada.getTitulo());
            tarea.setDescripcion(tareaActualizada.getDescripcion());
            tarea.setPrioridad(tareaActualizada.getPrioridad());
            tarea.setFecha(tareaActualizada.getFecha());
            tarea.setEstado(tareaActualizada.getEstado());
            return tareaRepository.save(tarea);
        }
        
        return null;
    }
    
    public boolean eliminar(Long id) {
        if (tareaRepository.existsById(id)) {
            tareaRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Tarea> buscarPorTitulo(String titulo) {
        return tareaRepository.findByTituloContainingIgnoreCase(titulo);
    }
    
    public List<Tarea> obtenerPorEstado(String estado) {
        return tareaRepository.findByEstado(estado);
    }
    
    public long contarPorEstado(String estado) {
        return tareaRepository.findByEstado(estado).size();
    }
}
