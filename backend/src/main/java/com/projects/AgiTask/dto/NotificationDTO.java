package com.projects.AgiTask.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import com.projects.AgiTask.entities.Notification;

public class NotificationDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String description;
	private LocalDateTime moment;
	private Boolean read;
	private Long userId;
	
	public NotificationDTO() {}

	public NotificationDTO(Long id, String description, LocalDateTime moment, Boolean read, Long userId) {
		super();
		this.id = id;
		this.description = description;
		this.moment = moment;
		this.read = read;
		this.userId = userId;
	}
	
	public NotificationDTO(Notification entity) {
		this.id = entity.getId();
		this.description = entity.getDescription();
		this.userId = entity.getUser().getId();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getMoment() {
		return moment;
	}

	public void setMoment(LocalDateTime moment) {
		this.moment = moment;
	}

	public Boolean getRead() {
		return read;
	}

	public void setRead(Boolean read) {
		this.read = read;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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
		NotificationDTO other = (NotificationDTO) obj;
		return Objects.equals(id, other.id);
	}
	
}
