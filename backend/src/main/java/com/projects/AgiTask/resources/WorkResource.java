package com.projects.AgiTask.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.AgiTask.dto.WorkDTO;
import com.projects.AgiTask.services.WorkService;

@RestController
@RequestMapping(value = "/works")
public class WorkResource {

	@Autowired
	private WorkService service;

	@GetMapping(value = "/{id}")
	public ResponseEntity<WorkDTO> findById(@PathVariable Long id) {
		WorkDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<WorkDTO> insert (@RequestBody WorkDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);	
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<WorkDTO> update(@PathVariable Long id, @RequestBody WorkDTO dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<WorkDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping(value = "/{employeeId}/totalTime/{year}/{month}")
	public ResponseEntity<Integer> findTotalTimeByEmployeeAndMonthAndYear(@PathVariable Long employeeId, @PathVariable Integer month, @PathVariable Integer year) {
		Integer totalHours = service.findTotalTimeByEmployeeAndMonthAndYear(employeeId, month, year);	
		return ResponseEntity.ok().body(totalHours);
	}
	
	@GetMapping(value = "/{employeeId}/totalWorks/{year}/{month}")
	public ResponseEntity<List<WorkDTO>> findWorksByEmployeeAndMonthAndYear(@PathVariable Long employeeId, @PathVariable Integer month, @PathVariable Integer year) {
		List<WorkDTO> totalWorks = service.findWorksByEmployeeAndMonthAndYear(employeeId, month, year);	
		return ResponseEntity.ok().body(totalWorks);
	}
	
	@PutMapping(value = "/{id}/finishWork")
	public ResponseEntity<WorkDTO> finishWork(@PathVariable Long id, @RequestBody WorkDTO dto) {
		dto = service.finishWork(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
}
