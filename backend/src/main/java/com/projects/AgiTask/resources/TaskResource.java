package com.projects.AgiTask.resources;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.AgiTask.dto.TaskDTO;
import com.projects.AgiTask.dto.TasksByStatusDTO;
import com.projects.AgiTask.entities.enums.Status;
import com.projects.AgiTask.services.TaskService;

@RestController
@RequestMapping(value = "/tasks")
public class TaskResource {

	@Autowired
	private TaskService service;
	
	@GetMapping
	public ResponseEntity<Page<TaskDTO>> findAll(Pageable pageable) {
		Page<TaskDTO> list = service.findAllPaged(pageable);	
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/status/{status}")
	public ResponseEntity<Page<TaskDTO>> findByStatus(@PathVariable("status") Status status, @RequestParam(value = "title", defaultValue = "") String title, Pageable pageable) {
	    Page<TaskDTO> list = service.findByStatus(status, title.trim(), pageable);
	    return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}") 
	public ResponseEntity<TaskDTO> findById(@PathVariable Long id) {
		TaskDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<TaskDTO> insert (@Valid @RequestBody TaskDTO dto) {
		TaskDTO newDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDto.getId()).toUri();
		return ResponseEntity.created(uri).body(newDto);	
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<TaskDTO> update(@PathVariable Long id, @Valid @RequestBody TaskDTO dto)	{
		TaskDTO newDto = service.update(id, dto);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/{id}/updateStatus/{status}")
	public ResponseEntity<TaskDTO> updateStatus(@PathVariable Long id, @PathVariable Status status)	{
		TaskDTO newDto = service.updateStatus(id, status);
		return ResponseEntity.ok().body(newDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<TaskDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/byStatus")
	public ResponseEntity<List<TasksByStatusDTO>> findByStatus() {
	    List<TasksByStatusDTO> list = service.findTasksByStatus();
	    return ResponseEntity.ok(list);
	}

	
}
