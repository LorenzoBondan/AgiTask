package com.projects.AgiTask.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import com.projects.AgiTask.entities.Work;

public class WorkDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Integer time;
	private Long employeeId;
	private Long taskId;
	private LocalDateTime dateTime;
	
	public WorkDTO() {}

	public WorkDTO(Long id, Integer time, Long employeeId, Long taskId, LocalDateTime dateTime) {
		super();
		this.id = id;
		this.time = time;
		this.employeeId = employeeId;
		this.taskId = taskId;
		this.dateTime = dateTime;
	}
	
	public WorkDTO(Work entity) {
		this.id = entity.getId();
		this.time = entity.getTime();
		this.employeeId = entity.getEmployee().getId();
		this.taskId = entity.getTask().getId();
		this.dateTime = entity.getDateTime();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getTime() {
		return time;
	}

	public void setTime(Integer time) {
		this.time = time;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public Long getTaskId() {
		return taskId;
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		WorkDTO other = (WorkDTO) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
