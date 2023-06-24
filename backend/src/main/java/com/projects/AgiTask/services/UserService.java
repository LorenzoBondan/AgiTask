package com.projects.AgiTask.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.AgiTask.dto.NotificationDTO;
import com.projects.AgiTask.dto.RoleDTO;
import com.projects.AgiTask.dto.UserDTO;
import com.projects.AgiTask.dto.UserInsertDTO;
import com.projects.AgiTask.dto.UserUpdateDTO;
import com.projects.AgiTask.dto.WorkDTO;
import com.projects.AgiTask.entities.Comment;
import com.projects.AgiTask.entities.Group;
import com.projects.AgiTask.entities.Notification;
import com.projects.AgiTask.entities.Role;
import com.projects.AgiTask.entities.Task;
import com.projects.AgiTask.entities.User;
import com.projects.AgiTask.entities.Work;
import com.projects.AgiTask.repositories.CommentRepository;
import com.projects.AgiTask.repositories.GroupRepository;
import com.projects.AgiTask.repositories.NotificationRepository;
import com.projects.AgiTask.repositories.RoleRepository;
import com.projects.AgiTask.repositories.TaskRepository;
import com.projects.AgiTask.repositories.UserRepository;
import com.projects.AgiTask.repositories.WorkRepository;
import com.projects.AgiTask.services.exceptions.DataBaseException;
import com.projects.AgiTask.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {

	private static Logger logger = org.slf4j.LoggerFactory.getLogger(UserService.class); 

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository repository;

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private GroupRepository groupRepository;
	
	@Autowired
	private WorkRepository workRepository;
	
	@Autowired
	private TaskRepository taskRepository;
	

	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(String name, Pageable pageable) {
		Page<User> list = repository.find(name, pageable);
		return list.map(x -> new UserDTO(x));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new UserDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public UserDTO findByEmail(String email) {
		Optional<User> obj = Optional.ofNullable(repository.findByEmail(email));
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		copyDtoToEntity(dto, entity);

		entity.setPassword(passwordEncoder.encode(dto.getPassword()));

		entity = repository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new UserDTO(entity);
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

	private void copyDtoToEntity(UserDTO dto, User entity) {

		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.setImgUrl(dto.getImgUrl());
		entity.setTotalTasksCompleted(dto.getTotalTasksCompleted());

		for (RoleDTO rolDto : dto.getRoles()) {
			Role role = roleRepository.getOne(rolDto.getId());
			entity.getRoles().add(role);
		}
		
		for (NotificationDTO notDto : dto.getNotifications()) {
			Notification not = notificationRepository.getOne(notDto.getId());
			entity.getNotifications().add(not);
		}
		
		for (Long comId : dto.getCommentsId()) {
			Comment com = commentRepository.getOne(comId);
			entity.getComments().add(com);
		}
		
		for (Long groupId : dto.getGroupsId()) {
			Group group = groupRepository.getOne(groupId);
			entity.getGroups().add(group);
		}
		
		for (WorkDTO workDto : dto.getWorks()) {
			Work work = workRepository.getOne(workDto.getId());
			entity.getWorks().add(work);
		}
		
		for (Long taskId : dto.getTasksId()) {
			Task task = taskRepository.getOne(taskId);
			entity.getTasks().add(task);
		}
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByEmail(username);

		if (user == null) {
			logger.error("User not found: " + username);
			throw new UsernameNotFoundException("Email not found");
		}
		logger.info("User found: " + username);
		return user;
	}
	
	

}
