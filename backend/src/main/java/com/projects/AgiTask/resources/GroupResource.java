package com.projects.AgiTask.resources;

import java.net.URI;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.AgiTask.dto.GroupDTO;
import com.projects.AgiTask.services.GroupService;

@RestController
@RequestMapping(value = "/groups")
public class GroupResource {

	@Autowired
	private GroupService service;
	
	@GetMapping
	public ResponseEntity<Page<GroupDTO>> findAll(Pageable pageable) {		
		Page<GroupDTO> list = service.findGroupsFromCurrentUser(pageable);	
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<GroupDTO> findById(@PathVariable Long id) {
		GroupDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<GroupDTO> insert (@RequestBody GroupDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);	
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<GroupDTO> update(@PathVariable Long id, @RequestBody GroupDTO dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<GroupDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/leave/{id}")
	public ResponseEntity<GroupDTO> leaveGroup(@PathVariable Long id, @RequestBody GroupDTO dto) {
		dto = service.leaveGroup(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
}
