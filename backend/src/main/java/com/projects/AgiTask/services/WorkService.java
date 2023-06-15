package com.projects.AgiTask.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.AgiTask.dto.WorkDTO;
import com.projects.AgiTask.entities.Work;
import com.projects.AgiTask.repositories.TaskRepository;
import com.projects.AgiTask.repositories.UserRepository;
import com.projects.AgiTask.repositories.WorkRepository;
import com.projects.AgiTask.services.exceptions.DataBaseException;
import com.projects.AgiTask.services.exceptions.ResourceNotFoundException;

@Service
public class WorkService {

	@Autowired
	private WorkRepository repository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private TaskRepository taskRepository;

	@Transactional(readOnly = true)
	public WorkDTO findById(Long id) {
		Optional<Work> obj = repository.findById(id);
		Work entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new WorkDTO(entity);
	}

	@Transactional
	public WorkDTO insert(WorkDTO dto) {
		Work entity = new Work();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new WorkDTO(entity);
	}

	@Transactional
	public WorkDTO update(Long id, WorkDTO dto) {
		try {
			Work entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new WorkDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
	}
	
	private void copyDtoToEntity(WorkDTO dto, Work entity) {
		entity.setTime(dto.getTime());
		entity.setEmployee(userRepository.getOne(dto.getEmployeeId()));
		entity.setTask(taskRepository.getOne(dto.getTaskId()));
		entity.setDateTime(dto.getDateTime());
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
