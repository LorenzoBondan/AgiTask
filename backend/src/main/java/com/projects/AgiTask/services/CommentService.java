package com.projects.AgiTask.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.AgiTask.dto.CommentDTO;
import com.projects.AgiTask.entities.Comment;
import com.projects.AgiTask.entities.Notification;
import com.projects.AgiTask.entities.Task;
import com.projects.AgiTask.entities.User;
import com.projects.AgiTask.repositories.CommentRepository;
import com.projects.AgiTask.repositories.NotificationRepository;
import com.projects.AgiTask.repositories.TaskRepository;
import com.projects.AgiTask.repositories.UserRepository;
import com.projects.AgiTask.services.exceptions.DataBaseException;
import com.projects.AgiTask.services.exceptions.ResourceNotFoundException;

@Service
public class CommentService {

	@Autowired
	private CommentRepository repository;
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Autowired
	private AuthService authService;
	
	@Transactional(readOnly = true) // goes in TaskResource
	public List<CommentDTO> findCommentsByTaskId(Long TaskId) {
		Task task = taskRepository.getOne(TaskId);
		return task.getComments().stream().map(comment -> new CommentDTO(comment)).collect(Collectors.toList());
	}

	@Transactional
	public CommentDTO insert(CommentDTO dto) {
		Comment entity = new Comment();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		
		// don't send a notification to myself if I posted the comment
		User me = authService.authenticated();
		
		// send a notification to every follower of the task when someone post a new comment
		Task task = taskRepository.getOne(entity.getTask().getId());
		for(User follower : task.getFollowers()) {
			if(follower != me) {
				LocalDateTime date = LocalDateTime.now();
				Notification notification = new Notification();
				notification.setDescription("The task: '" + task.getTitle() + "' has a new comment from " + entity.getAuthor().getName() + ".");
				notification.setMoment(date);
				notification.setRead(false);
				notification.setUser(follower);
					
				notification = notificationRepository.save(notification);
					
				follower.getNotifications().add(notification);
				follower = userRepository.save(follower);
			}
		}
		
		// also send a notification to the creator
		User creator = task.getCreator();
		if(creator != me) {
			LocalDateTime date = LocalDateTime.now();
			Notification notification = new Notification();
			notification.setDescription("The task: '" + task.getTitle() + "' has a new comment from " + entity.getAuthor().getName() + ".");
			notification.setMoment(date);
			notification.setRead(false);
			notification.setUser(creator);
				
			notification = notificationRepository.save(notification);
				
			creator.getNotifications().add(notification);
			creator = userRepository.save(creator);
		}

		return new CommentDTO(entity);
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

	private void copyDtoToEntity(CommentDTO dto, Comment entity) {
		entity.setText(dto.getText());
		entity.setDateTime(dto.getDateTime());
		entity.setAuthor(userRepository.getOne(dto.getAuthor().getId()));
		entity.setTask(taskRepository.getOne(dto.getTaskId()));
	}

}
