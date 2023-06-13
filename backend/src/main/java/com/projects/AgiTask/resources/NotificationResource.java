package com.projects.AgiTask.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projects.AgiTask.dto.NotificationDTO;
import com.projects.AgiTask.dto.RoleDTO;
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
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<RoleDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
