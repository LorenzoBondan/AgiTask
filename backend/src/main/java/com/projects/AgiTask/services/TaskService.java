package com.projects.AgiTask.services;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.AgiTask.dto.CommentDTO;
import com.projects.AgiTask.dto.TaskDTO;
import com.projects.AgiTask.dto.WorkDTO;
import com.projects.AgiTask.entities.Comment;
import com.projects.AgiTask.entities.Notification;
import com.projects.AgiTask.entities.Task;
import com.projects.AgiTask.entities.User;
import com.projects.AgiTask.entities.Work;
import com.projects.AgiTask.entities.enums.Status;
import com.projects.AgiTask.repositories.CommentRepository;
import com.projects.AgiTask.repositories.NotificationRepository;
import com.projects.AgiTask.repositories.TaskRepository;
import com.projects.AgiTask.repositories.UserRepository;
import com.projects.AgiTask.repositories.WorkRepository;
import com.projects.AgiTask.services.exceptions.DataBaseException;
import com.projects.AgiTask.services.exceptions.ResourceNotFoundException;

@Service
public class TaskService {

	@Autowired
	private TaskRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Autowired
	private WorkRepository workRepository;
	
	@Transactional(readOnly = true)
	public Page<TaskDTO> findAllPaged(Pageable pageable) {
		Page<Task> list = repository.findAll(pageable);
		return list.map(x -> new TaskDTO(x));
	}
	
	@Transactional(readOnly = true)
	public Page<TaskDTO> findByStatus(Status status, Pageable pageable) {
		Page<Task> list = repository.findByStatus(status, pageable);
		return list.map(x -> new TaskDTO(x));
	}

	@Transactional(readOnly = true)
	public TaskDTO findById(Long id) {
		Optional<Task> obj = repository.findById(id);
		Task entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new TaskDTO(entity);
	}
	
	@Transactional
	public TaskDTO insert(TaskDTO dto) {
		Task entity = new Task();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		
		// send a notification to every follower when the task is created
		for(User follower : entity.getFollowers()) {
			LocalDateTime date = LocalDateTime.now();
			Notification notification = new Notification();
			notification.setDescription("You were added as follower to the task: " + entity.getTitle() + ".");
			notification.setMoment(date);
			notification.setRead(false);
			notification.setUser(follower);
			
			notification = notificationRepository.save(notification);
			
			follower.getNotifications().add(notification);
			follower = userRepository.save(follower);
		}
		
		return new TaskDTO(entity);
	}

	@Transactional
	public TaskDTO update(Long id, TaskDTO dto) {
		try {
			Task entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new TaskDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	@Transactional
	public TaskDTO updateStatus(Long id, Status status) {
		try {
			Task entity = repository.getOne(id);
			entity.setStatus(status);
			entity = repository.save(entity);
			return new TaskDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
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

	private void copyDtoToEntity(TaskDTO dto, Task entity) {

		entity.setTitle(dto.getTitle());
		entity.setDescription(dto.getDescription());
		entity.setStartDate(dto.getStartDate());
		entity.setStatus(dto.getStatus());
		entity.setCreator(userRepository.getOne(dto.getCreatorId()));
		

		for (CommentDTO comDto : dto.getComments()) {
			Comment comment = commentRepository.getOne(comDto.getId());
			entity.getComments().add(comment);
		}
		
		for (WorkDTO workDto : dto.getWorks()) {
			Work work = workRepository.getOne(workDto.getId());
			entity.getWorks().add(work);
		}
		
		for (Long followerId : dto.getFollowersId()) {
			User user = userRepository.getOne(followerId);
			entity.getFollowers().add(user);
		}
		
	}
}
