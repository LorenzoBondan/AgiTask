package com.projects.AgiTask.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import com.projects.AgiTask.entities.Work;

public class WorkDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Integer totalTime;
	private Long employeeId;
	private Long taskId;
	private LocalDateTime dateTimeStart;
	private LocalDateTime dateTimeEnd;
	
	public WorkDTO() {}

	public WorkDTO(Long id, Integer totalTime, Long employeeId, Long taskId, LocalDateTime dateTimeStart, LocalDateTime dateTimeEnd) {
		super();
		this.id = id;
		this.totalTime = totalTime;
		this.employeeId = employeeId;
		this.taskId = taskId;
		this.dateTimeStart = dateTimeStart;
		this.dateTimeEnd = dateTimeEnd;
	}
	
	public WorkDTO(Work entity) {
		this.id = entity.getId();
		this.totalTime = entity.getTotalTime();
		this.employeeId = entity.getEmployee().getId();
		this.taskId = entity.getTask().getId();
		this.dateTimeStart = entity.getDateTimeStart();
		this.dateTimeEnd = entity.getDateTimeEnd();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getTotalTime() {
		return totalTime;
	}

	public void setTotalTime(Integer totalTime) {
		this.totalTime = totalTime;
	}

	public LocalDateTime getDateTimeStart() {
		return dateTimeStart;
	}

	public void setDateTimeStart(LocalDateTime dateTimeStart) {
		this.dateTimeStart = dateTimeStart;
	}

	public LocalDateTime getDateTimeEnd() {
		return dateTimeEnd;
	}

	public void setDateTimeEnd(LocalDateTime dateTimeEnd) {
		this.dateTimeEnd = dateTimeEnd;
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
