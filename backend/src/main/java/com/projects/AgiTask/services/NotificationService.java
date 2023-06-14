package com.projects.AgiTask.services;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.AgiTask.dto.NotificationDTO;
import com.projects.AgiTask.entities.Notification;
import com.projects.AgiTask.entities.User;
import com.projects.AgiTask.repositories.NotificationRepository;
import com.projects.AgiTask.repositories.UserRepository;
import com.projects.AgiTask.services.exceptions.DataBaseException;
import com.projects.AgiTask.services.exceptions.ResourceNotFoundException;

@Service
public class NotificationService {

	@Autowired
	private NotificationRepository repository;
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public Page<NotificationDTO> notificationsForCurrentUser(boolean unreadOnly, Pageable pageable){
		User user = authService.authenticated();
		Page<Notification> page = repository.find(user, unreadOnly, pageable);
		return page.map(x -> new NotificationDTO(x));
	}
	
	@Transactional
	public NotificationDTO insert(NotificationDTO dto) {
		Notification entity = new Notification();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new NotificationDTO(entity);
	}
	
	@Transactional
	public NotificationDTO updateToRead(Long id, NotificationDTO dto) {
		try {
			Notification entity = repository.getOne(id);
			entity.setRead(true);
			entity = repository.save(entity);
			return new NotificationDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	private void copyDtoToEntity(NotificationDTO dto, Notification entity) {
		entity.setDescription(dto.getDescription());
		entity.setMoment(dto.getMoment());
		entity.setRead(dto.getRead());
		entity.setUser(userRepository.getOne(dto.getUserId()));
	}
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}

		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity Violation");
		}
	}
}
