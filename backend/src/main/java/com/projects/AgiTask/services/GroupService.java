package com.projects.AgiTask.services;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.AgiTask.dto.GroupDTO;
import com.projects.AgiTask.dto.UserDTO;
import com.projects.AgiTask.entities.Group;
import com.projects.AgiTask.entities.Notification;
import com.projects.AgiTask.entities.User;
import com.projects.AgiTask.repositories.GroupRepository;
import com.projects.AgiTask.repositories.NotificationRepository;
import com.projects.AgiTask.repositories.UserRepository;
import com.projects.AgiTask.services.exceptions.DataBaseException;
import com.projects.AgiTask.services.exceptions.ResourceNotFoundException;

@Service
public class GroupService {

	@Autowired
	private GroupRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Autowired
	private AuthService authService;

	@Transactional(readOnly = true)
	public Page<GroupDTO> findGroupsFromCurrentUser(Pageable pageable) {
		User user = authService.authenticated();
		Page<Group> list = repository.findGroupsByUser(user, pageable);
		return list.map(x -> new GroupDTO(x));
	}

	@Transactional(readOnly = true)
	public GroupDTO findById(Long id) {
		Optional<Group> obj = repository.findById(id);
		Group entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new GroupDTO(entity);
	}

	@Transactional
	public GroupDTO insert(GroupDTO dto) {
		Group entity = new Group();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		
		// don't send a notification to myself
		User me = authService.authenticated();
		
		// send a notification to every member of the group
		for(User member : entity.getUsers()) {
			if(member != me) {
				LocalDateTime date = LocalDateTime.now();
				Notification notification = new Notification();
				notification.setDescription("You were added to the group '" + entity.getName() + "'.");
				notification.setMoment(date);
				notification.setRead(false);
				notification.setUser(member);
					
				notification = notificationRepository.save(notification);
					
				member.getNotifications().add(notification);
				member = userRepository.save(member);
			}
		}
		
		return new GroupDTO(entity);
	}

	@Transactional
	public GroupDTO update(Long id, GroupDTO dto) {
		try {
			Group entity = repository.getOne(id);
			
			// get the users who are already in the group
			Set<User> usersAlreadyIn = entity.getUsers();
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			
			// getting all the users after the update
			Set<User> usersAfterUpdate = entity.getUsers();
			
			// filtering only the users added
			for(User user : usersAlreadyIn) {
				if(usersAfterUpdate.contains(user)) {
					usersAfterUpdate.remove(user);
				}
			}
			
			// send a notification to new users
			for(User userAdded : usersAfterUpdate) {
				LocalDateTime date = LocalDateTime.now();
				Notification notification = new Notification();
				notification.setDescription("You were added to a new group: " + entity.getName() + ".");
				notification.setMoment(date);
				notification.setRead(false);
				notification.setUser(userAdded);
					
				notification = notificationRepository.save(notification);
					
				userAdded.getNotifications().add(notification);
				userAdded = userRepository.save(userAdded);
			}
			
			return new GroupDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	private void copyDtoToEntity(GroupDTO dto, Group entity) {
		entity.setName(dto.getName());
		
		for(UserDTO userDto : dto.getUsers()) {
			User user = userRepository.getOne(userDto.getId());
			entity.getUsers().add(user);
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
	
	@Transactional
	public GroupDTO leaveGroup(Long id) {
		try {
			Group entity = repository.getOne(id);
			User user = authService.authenticated();
			entity.getUsers().remove(user);
			entity = repository.save(entity);
			return new GroupDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
}
