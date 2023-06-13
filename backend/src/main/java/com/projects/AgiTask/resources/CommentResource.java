package com.projects.AgiTask.resources;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.AgiTask.dto.CommentDTO;
import com.projects.AgiTask.services.CommentService;


@RestController
@RequestMapping(value = "/comments")
public class CommentResource {

	@Autowired
	private CommentService service;
	
	@GetMapping(value = "/{taskId}") 
	public ResponseEntity<List<CommentDTO>> findCommentsByTaskId(@PathVariable Long taskId) {
		List<CommentDTO> dto = service.findCommentsByTaskId(taskId);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<CommentDTO> insert (@Valid @RequestBody CommentDTO dto) {
		CommentDTO newDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDto.getId()).toUri();
		return ResponseEntity.created(uri).body(newDto);	
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<CommentDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
