package com.projects.AgiTask.entities;

import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_work")
public class Work implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime dateTimeStart;
	
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime dateTimeEnd;
	
	@ManyToOne
    @JoinColumn(name = "employee_id")
	private User employee;
	
	@ManyToOne
    @JoinColumn(name = "task_id")
	private Task task;
	
	public Work() {}

	public Work(Long id, User employee, Task task, LocalDateTime dateTimeStart, LocalDateTime dateTimeEnd) {
		super();
		this.id = id;
		this.employee = employee;
		this.task = task;
		this.dateTimeEnd = dateTimeEnd;
		this.dateTimeStart = dateTimeStart;
	}
	
    public Integer getTotalTime() {
        Duration duration = Duration.between(dateTimeStart, dateTimeEnd);
        return (int) duration.toMinutes();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getEmployee() {
		return employee;
	}

	public void setEmployee(User employee) {
		this.employee = employee;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
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
		Work other = (Work) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
