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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.AgiTask.dto.NotificationDTO;
import com.projects.AgiTask.services.NotificationService;

@RestController
@RequestMapping(value = "/notifications")
public class NotificationResource {
	
	@Autowired
	private NotificationService service;
	
	@GetMapping
	public ResponseEntity<Page<NotificationDTO>> notificationsForCurrentUser(@RequestParam(name= "unreadOnly", defaultValue = "false") Boolean unreadOnly, Pageable pageable) {
		Page<NotificationDTO> page = service.notificationsForCurrentUser(unreadOnly, pageable);
		return ResponseEntity.ok().body(page);
	}
	
	@PostMapping
	public ResponseEntity<NotificationDTO> insert (@RequestBody NotificationDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);	
	}
	
	@PutMapping(value = "/{id}/read")
	public ResponseEntity<NotificationDTO> updateToRead(@PathVariable Long id)	{
		NotificationDTO newDto = service.updateToRead(id);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/{id}/unread")
	public ResponseEntity<NotificationDTO> updateToUnread(@PathVariable Long id)	{
		NotificationDTO newDto = service.updateToUnread(id);
		return ResponseEntity.ok().body(newDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<NotificationDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
